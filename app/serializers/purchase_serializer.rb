class PurchaseSerializer < ActiveModel::Serializer
    attributes :id, :artwork, :order_id, :quantity
  end
  