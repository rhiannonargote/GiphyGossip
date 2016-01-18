# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  story_id   :integer
#  url        :string
#  word       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Image < ActiveRecord::Base
  belongs_to :story
end
