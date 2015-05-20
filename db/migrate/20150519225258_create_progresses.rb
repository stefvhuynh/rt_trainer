class CreateProgresses < ActiveRecord::Migration
  def change
    create_table :progresses do |t|
      t.integer :level, null: false
      t.integer :session, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :progresses, :level
    add_index :progresses, :user_id, unique: true
  end
end
