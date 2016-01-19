json.array!(@images) do |image|
  json.extract! image, :id, :story_id, :url, :word
  json.url image_url(image, format: :json)
end
