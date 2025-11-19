const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Coupon = sequelize.define('Coupon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUppercase: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    discountType: {
      type: DataTypes.ENUM('percentage', 'fixed'),
      allowNull: false,
      field: 'discount_type'
    },
    discountValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'discount_value',
      get() {
        const value = this.getDataValue('discountValue');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    minOrderValue: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      field: 'min_order_value',
      get() {
        const value = this.getDataValue('minOrderValue');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    maxDiscount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'max_discount',
      get() {
        const value = this.getDataValue('maxDiscount');
        return value ? parseFloat(value) : null;
      },
      validate: {
        min: 0
      }
    },
    usageLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'usage_limit',
      validate: {
        min: 0
      }
    },
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'usage_count',
      validate: {
        min: 0
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expires_at'
    }
  }, {
    tableName: 'coupons',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['code'] },
      { fields: ['isActive'] }
    ]
  });

  return Coupon;
};
