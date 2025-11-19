const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('total');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('subtotal');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      get() {
        const value = this.getDataValue('tax');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    shipping: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      get() {
        const value = this.getDataValue('shipping');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    discount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      get() {
        const value = this.getDataValue('discount');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    couponCode: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'coupon_code'
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'payment_method'
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
      field: 'payment_status'
    },
    shippingAddress: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: 'shipping_address'
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'tracking_number'
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['status'] },
      { fields: ['createdAt'] }
    ]
  });

  return Order;
};
