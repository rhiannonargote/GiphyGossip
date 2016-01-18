class FixFuxup < ActiveRecord::Migration
  def change
    rename_column :images, :urL, :url
  end
end
