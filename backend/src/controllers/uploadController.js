const path = require('path');

/**
 * @desc    Upload single image
 * @route   POST /api/v1/upload/image
 * @access  Private/Admin
 */
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILE',
          message: 'Please upload an image file'
        }
      });
    }

    // Return the file URL
    const fileUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: {
        url: fileUrl,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload multiple images
 * @route   POST /api/v1/upload/images
 * @access  Private/Admin
 */
exports.uploadImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILES',
          message: 'Please upload at least one image file'
        }
      });
    }

    // Return array of file URLs
    const files = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.status(200).json({
      success: true,
      data: files
    });
  } catch (error) {
    next(error);
  }
};
