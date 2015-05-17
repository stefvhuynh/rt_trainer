class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :level, null: false
      t.integer :session, null: false
      t.decimal :reaction_time, null: false
      t.decimal :accuracy, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :scores, :level
    add_index :scores, :session
    add_index :scores, :user_id
  end
end
