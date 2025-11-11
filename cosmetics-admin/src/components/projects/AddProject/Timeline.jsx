import { useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FiMove } from "react-icons/fi"; // Import drag icon
import { FaExclamationTriangle } from "react-icons/fa";

const Timeline = ({
  timeLines,
  setTimelines,
  handleTimeLine,
  handleRemoveTimeLine,
  setInvestmentStartDate,
  setInvestmentEndDate,
  setFirstReturnDate,
  handleNextClick,
  investmentStartDate,
  firstReturnDate,
  investmentEndDate,
}) => {
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const returnDateRef = useRef(null);

  // Handle drag-and-drop reordering
  const handleOnDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside a valid droppable area, exit

    const updatedTimelines = Array.from(timeLines);
    const [movedItem] = updatedTimelines.splice(result.source.index, 1); // Remove the dragged item
    updatedTimelines.splice(result.destination.index, 0, movedItem); // Insert the dragged item at the new position
    setTimelines(updatedTimelines);
  };

  return (
    <div className="p-4 shadow-12">
      <h4 className="mb-8 text-xl font-semibold">Investment Duration</h4>

      {/* Timelines Section */}
      <h4 className="mt-8 text-lg font-semibold">Timelines</h4>
      <hr className="my-4 border-black" />

      {/* Drag-and-Drop Context */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="timelines">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {timeLines.map((option, index) => (
                <Draggable
                  key={index}
                  draggableId={`timeline-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          {...provided.dragHandleProps}
                          className="cursor-pointer"
                        >
                          <FiMove size={20} />
                        </span>

                        {/* Date Input */}
                        <div className="flex-1">
                          <label className="text-gray-700 mb-2 block font-semibold">
                            Date
                          </label>
                          <input
                            type="date"
                            className="border-gray-300 w-full rounded-md border p-2"
                            placeholder="Select Date"
                            value={option.date}
                            onChange={(e) => {
                              const updatedOptions = [...timeLines];
                              updatedOptions[index].date = e.target.value;
                              setTimelines(updatedOptions);
                            }}
                            style={{
                              borderColor: "#dddddd",
                              outlineColor: "#00c196",
                              outlineWidth: "2px",
                            }}
                          />
                        </div>
                      </div>

                      {/* Title Input */}
                      <div>
                        <label className="text-gray-700 mb-2 block font-semibold">
                          Title
                        </label>
                        <input
                          type="text"
                          className="border-gray-300 w-full rounded-md border p-2"
                          placeholder="Timeline Title"
                          value={option.title}
                          onChange={(e) => {
                            const updatedOptions = [...timeLines];
                            updatedOptions[index].title = e.target.value;
                            setTimelines(updatedOptions);
                          }}
                          style={{
                            borderColor: "#dddddd",
                            outlineColor: "#00c196",
                            outlineWidth: "2px",
                          }}
                        />
                      </div>

                      {/* Details Input */}
                      <div className="col-span-1 md:col-span-2 ms-6">
                        <label className="text-gray-700 mb-2 block font-semibold">
                          Details
                        </label>
                        <input
                          type="text"
                          className="border-gray-300 w-full rounded-md border p-2"
                          placeholder="Timeline Details"
                          value={option.details}
                          onChange={(e) => {
                            const updatedOptions = [...timeLines];
                            updatedOptions[index].details = e.target.value;
                            setTimelines(updatedOptions);
                          }}
                          style={{
                            borderColor: "#dddddd",
                            outlineColor: "#00c196",
                            outlineWidth: "2px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3">
        <p
          onClick={handleTimeLine}
          className="cursor-pointer rounded-md bg-teal-700 px-4 py-2 text-base text-white"
        >
          Add New Date
        </p>

        <p
          onClick={handleRemoveTimeLine}
          className="cursor-pointer rounded-md bg-rose-600 px-4 py-2 text-base text-white"
        >
          Delete
        </p>
      </div>
      {/* Others Section */}
      <div
        className="flex items-center bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-5"
        role="alert"
      >
        <FaExclamationTriangle className="h-6 w-6 mr-2" />
        <p>
          The input must remain the same; that has already been provided in the
          timeline.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Investment Start Date */}
        <div>
          <label className="text-gray-700 mb-2 block font-semibold">
            Investment Start Date
          </label>
          <input
            type="date"
            ref={startDateRef}
            className="border-gray-300 w-full rounded-md border p-2"
            onChange={(e) => setInvestmentStartDate(e.target.value)}
            onClick={() => startDateRef.current?.showPicker()}
            value={investmentStartDate}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>

        {/* Investment End Date */}
        <div>
          <label className="text-gray-700 mb-2 block font-semibold">
            Investment End Date
          </label>
          <input
            type="date"
            ref={endDateRef}
            className="border-gray-300 w-full rounded-md border p-2"
            onChange={(e) => setInvestmentEndDate(e.target.value)}
            onClick={() => endDateRef.current?.showPicker()}
            value={investmentEndDate}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>

        {/* First Return Date */}
        <div>
          <label className="text-gray-700 mb-2 block font-semibold">
            First Return Date
          </label>
          <input
            type="date"
            ref={returnDateRef}
            className="border-gray-300 w-full rounded-md border p-2"
            onChange={(e) => setFirstReturnDate(e.target.value)}
            onClick={() => returnDateRef.current?.showPicker()}
            value={firstReturnDate}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>
      </div>

      <div className="flex justify-end" onClick={handleNextClick}>
        <p
          style={{
            backgroundColor: "#006666",
            color: "white",
            padding: "10px 20px",
            marginRight: "30px",
            borderRadius: "5px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default Timeline;
