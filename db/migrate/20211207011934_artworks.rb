class Artworks < ActiveRecord::Migration[6.1]
  def change
    create_table :artworks do |t|
      t.string :name
      t.string :img
      t.text :description
      t.integer :price
      t.string :category

      t.timestamps
    end
  end
end