class Purchases < ActiveRecord::Migration[6.1]
  def change
    create_table :purchases do |t|
      t.belongs_to :artwork, null: false, foreign_key: true
      t.belongs_to :order, null: false, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
