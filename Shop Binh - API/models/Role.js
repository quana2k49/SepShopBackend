var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
  roleName: {
      type: String,
      require: true,
  },
  status: {
    type: String,
    require: true,
    default: 'inactive',
  }
}, { timestamps: true });

mongoose.model('Role', RoleSchema);
