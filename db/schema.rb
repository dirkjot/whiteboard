# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160126220717) do

  create_table "items", force: :cascade do |t|
    t.text     "title",       limit: 65535
    t.text     "description", limit: 65535
    t.string   "kind",        limit: 255
    t.integer  "post_id",     limit: 4
    t.boolean  "public",                    default: false
    t.boolean  "bumped",                    default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "standup_id",  limit: 4
    t.date     "date"
    t.string   "author",      limit: 255
  end

  create_table "posts", force: :cascade do |t|
    t.text     "title",        limit: 65535
    t.boolean  "sent"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "sent_at"
    t.string   "from",         limit: 255,   default: "Standup Blogger"
    t.datetime "blogged_at"
    t.boolean  "archived",                   default: false
    t.integer  "standup_id",   limit: 4
    t.string   "blog_post_id", limit: 255
  end

  create_table "standups", force: :cascade do |t|
    t.string   "title",             limit: 255
    t.string   "subject_prefix",    limit: 255
    t.string   "to_address",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "closing_message",   limit: 255
    t.string   "time_zone_name",    limit: 255,   default: "Eastern Time (US & Canada)", null: false
    t.string   "start_time_string", limit: 255,   default: "9:06am"
    t.text     "image_urls",        limit: 65535
    t.string   "image_days",        limit: 255
  end

end
