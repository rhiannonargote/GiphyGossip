json.array!(@stories) do |story|
  json.extract! story, :id, :content, :user_id, :title, :public
  json.url story_url(story, format: :json)
end
