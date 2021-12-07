class Order < ApplicationRecord
    belongs_to :user
    has_many :purchases, dependent: :destroy
  
    def showPurchaseArtworks
      self.purchases.map{ |purchase| purchase.artwork }
    end 
  
    def showTotal
      total = 0
      self.purchases.each{ |purchase| total = total + purchase.artwork.price }
      return total
    end 
  
    
  end
  