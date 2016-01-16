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

require 'test_helper'

class StoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
