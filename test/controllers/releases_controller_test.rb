require 'test_helper'

class ReleasesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get individual" do
    get :individual
    assert_response :success
  end

end