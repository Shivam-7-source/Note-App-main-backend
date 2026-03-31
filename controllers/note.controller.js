import Note from "../models/note.model.js";


//create k liea
export const createNote=async(req, res)=>{
  try {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required", });
    }

    const newNote = new Note({
      title,
      content,
    });

    await newNote.save();

    res.status(201).json(newNote);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get k liea
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//update k liea
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note: updatedNote,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//delete k lie 
export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    // ✅ Missing part (important)
    res.status(200).json({
      message: "Note deleted successfully",
      note: deletedNote,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};