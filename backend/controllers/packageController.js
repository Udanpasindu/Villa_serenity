const Package = require('../models/Package');
const fs = require('fs');
const path = require('path');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
exports.getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    
    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
exports.getPackage = async (req, res, next) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        error: 'Package not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: package
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new package
// @route   POST /api/packages
// @access  Private (Admin)
exports.createPackage = async (req, res, next) => {
  try {
    // Handle image upload if exists
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    const package = await Package.create(req.body);
    
    res.status(201).json({
      success: true,
      data: package
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private (Admin)
exports.updatePackage = async (req, res, next) => {
  try {
    let package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        error: 'Package not found'
      });
    }
    
    // Handle image upload if exists
    if (req.file) {
      // Delete old image if it's not the default
      if (package.image !== 'default-package.jpg') {
        const imagePath = path.join(__dirname, '../uploads', package.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      // Set new image
      req.body.image = req.file.filename;
    }
    
    package = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: package
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private (Admin)
exports.deletePackage = async (req, res, next) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        error: 'Package not found'
      });
    }
    
    // Delete image if it's not the default
    if (package.image !== 'default-package.jpg') {
      const imagePath = path.join(__dirname, '../uploads', package.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await package.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
