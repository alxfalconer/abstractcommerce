class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :orders
  
    def orders
      self.object.orders.map do |order|
        {id: order.id,
        checkedout: order.checkedout,
        purchases: order.purchases}
      end
    end
  
  end
  