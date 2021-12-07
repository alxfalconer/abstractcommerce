class ArtworksController < ApplicationController
    def index
        artworks = Artwork.all
        render json: artworks.to_json(:include => {
      :purchases => {:only => [:id, :artwork_id, :order_id, :quantity]}
    })
    end

    def show
        artwork = Artwork.find(params[:id])
        render json: artwork.to_json
      end
  
      
  
      private
  
      def artwork_params
        params.require(:artwork).permit(:name, :img, :description, :price, :category)
      end
end
