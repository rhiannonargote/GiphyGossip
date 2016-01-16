# == Schema Information
#
# Table name: stories
#
#  id         :integer          not null, primary key
#  content    :text
#  user_id    :integer
#  title      :text
#  public     :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Story < ActiveRecord::Base
  belongs_to :user
  has_many :images
end
