"use client";

import { useEffect, useRef, useState } from "react";
import { GripVertical, ArrowRight, Crosshair } from "lucide-react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  getCourses,
  updateCourse,
  reorderCourses,
} from "@/services/courseService";
import { courseCard } from "../courseCardStyles";

// ────────────────────────────────────────────────────────────────
// Presentational card. Reused both for the in-grid sortable item AND
// for the floating <DragOverlay> clone that follows the cursor.
// `handleProps` carries the drag listeners onto the grip handle only,
// so the rest of the card (inputs, buttons) stays fully interactive.
// ────────────────────────────────────────────────────────────────
function CourseCard({
  course,
  isEditing,
  saving,
  onEdit,
  onChange,
  onSave,
  onCancel,
  innerRef,
  style,
  handleProps,
  overlay = false,
}: {
  course: any;
  isEditing: boolean;
  saving: boolean;
  onEdit: (id: string) => void;
  onChange: (id: string, field: string, value: any) => void;
  onSave: (course: any) => void;
  onCancel: () => void;
  innerRef?: (node: HTMLElement | null) => void;
  style?: React.CSSProperties;
  handleProps?: Record<string, any>;
  overlay?: boolean;
}) {
  // Focal point as percentages (0–100, 50 = center). `??` so a stored 0 is kept.
  const fx = course.image_position_x ?? 50;
  const fy = course.image_position_y ?? 50;

  // Drag-to-position state. The overlay below maps the pointer to fx/fy.
  const focusRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const applyFocus = (clientX: number, clientY: number) => {
    const el = focusRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.round(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
    const y = Math.round(Math.max(0, Math.min(100, ((clientY - r.top) / r.height) * 100)));
    onChange(course.id, "image_position_x", x);
    onChange(course.id, "image_position_y", y);
  };

  return (
    <div
      ref={innerRef}
      style={style}
      className={`relative ${courseCard.shell} select-none touch-none ${
        isEditing ? "ring-2 ring-cyan-400" : ""
      } ${
        overlay ? "scale-105 shadow-[0_30px_80px_rgba(0,0,0,0.7)] rotate-[1deg]" : ""
      }`}
    >
      {/* IMAGE — fills the card; objectPosition reflects the live focal point */}
      <img
        src={course.image || "/1.avif"}
        style={{ objectPosition: `${fx}% ${fy}%` }}
        className="w-full h-full object-cover"
      />

      {/* GRADIENT */}
      <div className={courseCard.gradient} />

      {/* FOCAL-POINT EDITOR — drag/click anywhere on the image to set focus.
          Sits above the image (z-10) but below the panels (z-20), so the open
          image area is draggable while the inputs/buttons stay interactive. */}
      {isEditing && !overlay && (
        <div
          ref={focusRef}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            setDragging(true);
            applyFocus(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (dragging) applyFocus(e.clientX, e.clientY);
          }}
          onPointerUp={(e) => {
            setDragging(false);
            try {
              (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
            } catch {}
          }}
          className="absolute inset-0 z-10 cursor-move touch-none"
        >
          {/* Crosshair focus indicator at the current focal point */}
          <div
            className="absolute w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border-2 border-cyan-300 bg-cyan-300/20 shadow-[0_0_0_2px_rgba(0,0,0,0.45)] flex items-center justify-center pointer-events-none"
            style={{ left: `${fx}%`, top: `${fy}%` }}
          >
            <Crosshair size={14} className="text-cyan-200" />
          </div>
        </div>
      )}

      {/* DRAG HANDLE — click & hold to reorder (top-right, beside Edit) */}
      <button
        {...(handleProps || {})}
        aria-label="Drag to reorder"
        className={`absolute top-3 right-12 z-20 bg-white/20 text-white rounded p-1 touch-none ${
          overlay ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <GripVertical size={16} />
      </button>

      {/* EDIT / CLOSE BUTTON — same placement as the frontend card */}
      {!overlay && (
        <button
          onClick={() => (isEditing ? onCancel() : onEdit(course.id))}
          className="absolute z-20 top-3 right-3 bg-white text-black text-xs px-2 py-1 rounded"
        >
          {isEditing ? "Close" : "Edit"}
        </button>
      )}

      {/* AGE — badge (display) or editor, top-4 left-4 like the frontend */}
      {isEditing ? (
        <div className="absolute top-4 left-4 z-20 flex gap-1">
          <select
            value={course.age || ""}
            onChange={(e) => onChange(course.id, "age", e.target.value)}
            className="text-xs px-2 py-1 rounded bg-white text-black"
          >
            <option value="">Age</option>
            <option value="8+">8+</option>
            <option value="10+">10+</option>
            <option value="12+">12+</option>
            <option value="18+">18+</option>
          </select>
          <input
            placeholder="Custom"
            value={course.age || ""}
            onChange={(e) => onChange(course.id, "age", e.target.value)}
            className="text-xs px-2 py-1 rounded bg-white text-black w-[60px]"
          />
        </div>
      ) : (
        <div className={`absolute top-4 left-4 ${courseCard.ageBadge}`}>
          {course.age || "AGE"}
        </div>
      )}

      {/* DRAG HINT (edit only) */}
      {isEditing && !overlay && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/70 text-cyan-200 text-[10px] uppercase tracking-[1px] pointer-events-none">
          Drag image to set focus
        </div>
      )}

      {/* BOTTOM CONTENT */}
      {isEditing ? (
        <div className="absolute bottom-0 left-0 right-0 z-20 p-3 space-y-2 bg-black/75 backdrop-blur-sm rounded-b-[28px]">
          <input
            value={course.image || ""}
            onChange={(e) => onChange(course.id, "image", e.target.value)}
            placeholder="Image URL"
            className="w-full px-2 py-1 text-white text-xs bg-white/10 border border-white/20 rounded"
          />
          <input
            value={course.title || ""}
            onChange={(e) => onChange(course.id, "title", e.target.value)}
            placeholder="Title"
            className="w-full text-base font-bold text-white bg-white/10 px-2 py-1 rounded border border-white/20 uppercase"
          />
          <input
            type="number"
            value={course.price || 0}
            onChange={(e) => onChange(course.id, "price", Number(e.target.value))}
            placeholder="Price"
            className="w-full text-cyan-300 text-sm bg-white/10 px-2 py-1 rounded border border-white/20"
          />
          <textarea
            value={course.description || ""}
            onChange={(e) => onChange(course.id, "description", e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full text-xs text-white bg-white/10 px-2 py-1 rounded border border-white/20 resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => {
                onChange(course.id, "image_position_x", 50);
                onChange(course.id, "image_position_y", 50);
              }}
              className="bg-white/15 text-white px-2 py-1 rounded text-xs"
            >
              Reset to Center
            </button>
            <button
              onClick={() => onSave(course)}
              className="bg-green-400 text-black px-3 py-1 rounded text-sm"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={courseCard.bottomBlock}>
            <h3 className={courseCard.title}>{course.title}</h3>
            <p className={courseCard.fromLabel}>FROM</p>
            <p className={courseCard.price}>AED {course.price}</p>
          </div>

          {/* Decorative arrow — visual parity with the frontend card */}
          <div className="absolute bottom-5 right-5">
            <div className="w-14 h-14 rounded-full bg-[#18476D]/80 flex items-center justify-center">
              <ArrowRight className="text-white" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// In-grid sortable wrapper. While this item is the drag source it is
// hidden (the DragOverlay shows the moving clone); the other items get
// useSortable transforms so they shift smoothly to make room.
function SortableCourseCard(props: {
  course: any;
  isEditing: boolean;
  saving: boolean;
  onEdit: (id: string) => void;
  onChange: (id: string, field: string, value: any) => void;
  onSave: (course: any) => void;
  onCancel: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.course.id });

  return (
    <CourseCard
      {...props}
      innerRef={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
      }}
      handleProps={{ ...attributes, ...listeners }}
    />
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Drag starts from the handle only, essentially on mousedown (1px) for an
  // immediate grab. Clicks on Edit and the inputs never start a drag because
  // they carry no drag listeners.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await getCourses(); // already ordered by position ASC
    setCourses(data || []);
    setLoading(false);
  };

  const handleChange = (id: string, field: string, value: any) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = async (course: any) => {
    setSaving(true);
    await updateCourse(course.id, course);
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, ...course } : c))
    );
    setSaving(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    fetchCourses();
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragCancel = () => setActiveId(null);

  // Reorder locally for instant feedback, then persist to the DB.
  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = courses.findIndex((c) => c.id === active.id);
    const newIndex = courses.findIndex((c) => c.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(courses, oldIndex, newIndex);
    setCourses(newOrder);

    setSavingOrder(true);
    const { error } = await reorderCourses(newOrder.map((c) => c.id));
    if (error) await fetchCourses();
    setSavingOrder(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b2c44] text-white">
        Loading...
      </div>
    );
  }

  const activeCourse = courses.find((c) => c.id === activeId) || null;

  return (
    <div className="bg-[#0b2c44] py-20 text-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-2">
        CHOOSE YOUR <span className="text-cyan-400">PATH</span>
      </h1>

      <p className="text-center text-xs text-white/50 mb-10">
        {savingOrder ? "Saving order…" : "Click & hold the grip to drag a card"}
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={courses.map((c) => c.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex justify-center gap-5 flex-wrap">
            {courses.map((course) => (
              <SortableCourseCard
                key={course.id}
                course={course}
                isEditing={editingId === course.id}
                saving={saving}
                onEdit={setEditingId}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </SortableContext>

        {/* Floating clone that follows the cursor while dragging */}
        <DragOverlay>
          {activeCourse ? (
            <CourseCard
              course={activeCourse}
              isEditing={false}
              saving={false}
              onEdit={() => {}}
              onChange={() => {}}
              onSave={() => {}}
              onCancel={() => {}}
              overlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
