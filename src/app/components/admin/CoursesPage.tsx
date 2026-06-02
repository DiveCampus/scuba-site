"use client";

import { useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
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
  return (
    <div
      ref={innerRef}
      style={style}
      className={`w-[260px] rounded-2xl overflow-hidden relative select-none touch-none ${
        isEditing ? "ring-2 ring-cyan-400" : ""
      } ${
        overlay
          ? "scale-105 shadow-[0_30px_80px_rgba(0,0,0,0.7)] rotate-[1deg]"
          : "shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      }`}
    >
      {/* DRAG HANDLE — click & hold to drag */}
      <button
        {...(handleProps || {})}
        aria-label="Drag to reorder"
        className={`absolute top-3 left-3 z-20 bg-white/20 text-white rounded p-1 touch-none ${
          overlay ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <GripVertical size={16} />
      </button>

      {/* IMAGE */}
      <div className="relative">
        <img
          src={course.image || "/1.avif"}
          className="w-full h-[350px] object-cover"
        />

        {isEditing && (
          <div className="absolute top-0 left-0 w-full p-3 pt-12">
            <input
              value={course.image || ""}
              onChange={(e) => onChange(course.id, "image", e.target.value)}
              className="w-full px-2 py-1 text-white text-xs bg-white/10 border border-white/20 rounded"
            />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-end pointer-events-none">
        {/* EDIT BUTTON */}
        {!isEditing && !overlay && (
          <button
            onClick={() => onEdit(course.id)}
            className="absolute top-3 right-3 bg-white/20 px-2 py-1 text-xs rounded pointer-events-auto"
          >
            Edit
          </button>
        )}

        {/* AGE */}
        {isEditing ? (
          <input
            value={course.age || ""}
            onChange={(e) => onChange(course.id, "age", e.target.value)}
            className="text-xs text-white bg-white/10 px-2 py-1 rounded mb-2 pointer-events-auto border border-white/20"
          />
        ) : (
          <span className="text-xs bg-white text-black px-2 py-1 rounded mb-2 w-fit">
            {course.age}
          </span>
        )}

        {/* TITLE */}
        {isEditing ? (
          <input
            value={course.title || ""}
            onChange={(e) => onChange(course.id, "title", e.target.value)}
            className="text-lg font-bold text-white bg-white/10 px-2 rounded pointer-events-auto"
          />
        ) : (
          <h2 className="text-lg font-bold">{course.title}</h2>
        )}

        {/* PRICE */}
        {isEditing ? (
          <input
            type="number"
            value={course.price || 0}
            onChange={(e) =>
              onChange(course.id, "price", Number(e.target.value))
            }
            className="text-cyan-300 text-lg bg-white/10 px-2 rounded pointer-events-auto"
          />
        ) : (
          <p className="text-cyan-400 text-lg font-semibold">
            AED {course.price}
          </p>
        )}

        {/* DESCRIPTION */}
        {isEditing ? (
          <textarea
            value={course.description || ""}
            onChange={(e) =>
              onChange(course.id, "description", e.target.value)
            }
            className="text-xs text-white bg-white/10 px-2 rounded pointer-events-auto"
          />
        ) : (
          <p className="text-xs text-white/70">{course.description}</p>
        )}

        {/* ACTIONS */}
        {isEditing && (
          <div className="flex gap-2 mt-3 pointer-events-auto">
            <button
              onClick={() => onSave(course)}
              className="bg-green-400 text-black px-3 py-1 rounded text-sm"
            >
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={onCancel}
              className="bg-red-500 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
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
          <div className="flex justify-center gap-6 flex-wrap">
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
