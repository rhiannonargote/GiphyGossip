class StoriesController < ApplicationController
  before_action :set_story, only: [:show, :edit, :update, :destroy]

  def home
    end

  # GET /stories
  # GET /stories.json
  def index
    @stories = Story.all

    render :json => @stories.to_json(:include => [:images])
  end

  # GET /stories/1
  # GET /stories/1.json
  def show

  end

  # GET /stories/new
  def new
    @story = Story.new
  end

  # GET /stories/1/edit
  def edit
  end

  # POST /stories
  # POST /stories.json
  def create
    @story = Story.new(story_params)
    @storyNew = @story.content.scan( /#(\w+)/ ).flatten
    @gifs = []

    respond_to do |format|
      if @story.save
        @storyNew.each do |tag|

          # HANDLE NO SEARCH RESULTS! render :json => { status: :unprocessable_entity, reason: "No available image" }

          giphy_search = Giphy.search(tag, {limit: 1}) # Make a request to the Giphy API passing in the tag and the options
          # @gifs << giphy_search   # When that comes back, push the result into the @gifs array
          image = Image.create :url => giphy_search[0].original_image.url.to_s, :word => tag
          # Save the correct information as a new Image and associate it with the story
          @story.images << image
          # puts tag

        end
        format.html { redirect_to @story, notice: 'Story was successfully created.' }
        format.json { render :json => @story.to_json(:include => [:images]) }
      else
        format.html { render :new }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /stories/1
  # PATCH/PUT /stories/1.json
  def update
    respond_to do |format|
      if @story.update(story_params)
        format.html { redirect_to @story, notice: 'Story was successfully updated.' }
        format.json { render :show, status: :ok, location: @story }
      else
        format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def refresh
    image_details = params["images"]["0"]
    image = Image.find image_details["id"]

    res = Giphy.random(image_details["word"])
    # binding.pry
    image.url = res.image_original_url.to_s
    image.save

    render :json => image
  end

  # DELETE /stories/1
  # DELETE /stories/1.json
  def destroy
    @story.destroy
    respond_to do |format|
      format.html { redirect_to stories_url, notice: 'Story was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_story
      @story = Story.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def story_params
      params.require(:story).permit(:content, :user_id, :title, :public)
    end
end
