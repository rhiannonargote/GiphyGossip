class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.text :content
      t.integer :user_id
      t.text :title
      t.boolean :public

      t.timestamps null: false
    end
  end
end
