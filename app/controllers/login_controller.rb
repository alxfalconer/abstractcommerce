class LoginController < ApplicationController

    def create
      user = User.find_by("lower(username) = ?", params[:username].downcase)
      if user && user.authenticate(params[:password])
        render json: { token: token(user.id), total: user.orders.last.showTotal, purchases: user.orders.last.showPurchaseArtworks, user_id: user.id, order_id: user.orders.last.id }
      else
        render json: { errors: [ "No match." ] }, status: :unprocessable_entity
      end 
    end
  
  end