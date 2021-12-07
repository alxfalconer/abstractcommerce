class OrderSerializer < ActiveModel::Serializer
    attributes :id, :user_id, :purchases, :checkedout
  
    def purchases
      self.object.purchases.map do |purchase|
        {id: purchase.id,
        artwork: purchase.artwork,
        quantity: purchase.quantity}
      end
    end
  
  end
  