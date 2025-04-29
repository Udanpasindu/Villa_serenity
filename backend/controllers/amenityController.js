const Amenity = require('../models/Amenity');

// @desc    Get all amenities
// @route   GET /api/amenities
// @access  Public
exports.getAmenities = async (req, res, next) => {
  try {
    const amenities = await Amenity.find();
    
    res.status(200).json({
      success: true,
      count: amenities.length,
      data: amenities
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single amenity
// @route   GET /api/amenities/:id
// @access  Public
exports.getAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({
        success: false,
        error: 'Amenity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: amenity
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new amenity
// @route   POST /api/amenities
// @access  Private (Admin)
exports.createAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.create(req.body);
    
    res.status(201).json({
      success: true,
      data: amenity
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update amenity
// @route   PUT /api/amenities/:id
// @access  Private (Admin)
exports.updateAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!amenity) {
      return res.status(404).json({
        success: false,
        error: 'Amenity not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: amenity
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete amenity
// @route   DELETE /api/amenities/:id
// @access  Private (Admin)
exports.deleteAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    
    if (!amenity) {
      return res.status(404).json({
        success: false,
        error: 'Amenity not found'
      });
    }
    
    await amenity.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
