const Service = require('../models/Service');
const fs = require('fs');
const path = require('path');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Admin)
exports.createService = async (req, res, next) => {
  try {
    // Handle image upload if exists
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    const service = await Service.create(req.body);
    
    res.status(201).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Admin)
exports.updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    // Handle image upload if exists
    if (req.file) {
      // Delete old image if it's not the default
      if (service.image !== 'default-service.jpg') {
        const imagePath = path.join(__dirname, '../uploads', service.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      
      // Set new image
      req.body.image = req.file.filename;
    }
    
    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: service
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Admin)
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }
    
    // Delete image if it's not the default
    if (service.image !== 'default-service.jpg') {
      const imagePath = path.join(__dirname, '../uploads', service.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await service.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
