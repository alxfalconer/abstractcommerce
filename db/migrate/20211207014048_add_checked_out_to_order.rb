class AddCheckedOutToOrder < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :checkedout, :boolean
  end
end
