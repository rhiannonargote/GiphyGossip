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

require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
