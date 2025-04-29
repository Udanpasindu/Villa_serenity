const TeamMember = require('../models/TeamMember');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await TeamMember.find();
    
    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private (Admin)
exports.createTeamMember = async (req, res, next) => {
  try {
    // Handle image upload if exists
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    const teamMember = await TeamMember.create(req.body);
    
    res.status(201).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
exports.updateTeamMember = async (req, res, next) => {
  try {
    let teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found'
      });
    }
    
    // Handle image upload if exists
    if (req.file) {
      req.body.image = req.file.filename;
    }
    
    teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found'
      });
    }
    
    await teamMember.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};
