const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('price');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0
      }
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'original_price',
      get() {
        const value = this.getDataValue('originalPrice');
        return value ? parseFloat(value) : null;
      },
      validate: {
        min: 0
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    images: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0,
      get() {
        const value = this.getDataValue('rating');
        return value ? parseFloat(value) : 0;
      },
      validate: {
        min: 0,
        max: 5
      }
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: 'review_count'
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    variants: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    features: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    specifications: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },
    productType: {
      type: DataTypes.STRING(50),
      defaultValue: 'simple',
      field: 'product_type',
      validate: {
        isIn: [['simple', 'variable', 'affiliate', 'soldout', 'countdown']]
      }
    },
    affiliateLink: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'affiliate_link'
    },
    countdownEnd: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'countdown_end'
    }
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['name'] },
      { fields: ['category_id'] },
      { fields: ['price'] },
      { fields: ['rating'] },
      { fields: ['is_active'] }
    ]
  });

  return Product;
};
