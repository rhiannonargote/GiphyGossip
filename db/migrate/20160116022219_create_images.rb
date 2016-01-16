class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.integer :story_id
      t.string :urL
      t.text :word

      t.timestamps null: false
    end
  end
end
