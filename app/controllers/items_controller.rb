class ItemsController < ApplicationController
  def create
    @item = Item.new(params[:item].merge(post_id: params[:post_id]))
    if @item.save
      redirect_to @item.post ? edit_post_path(@item.post) : '/'
    else
      render 'items/new'
    end
  end

  def new
    @post = Post.find_by_id(params[:post_id])
    @item = Item.new(params[:item])
    if params[:kind]
      render "items/new_#{params[:kind]}"
    else
      render "items/new"
    end
  end

  def index
    @items = Item.orphans.group_by { |i| i.kind }
    @public_items = Item.orphans.public.group_by { |i| i.kind }
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    redirect_to @item.post ? edit_post_path(@item.post) : '/'
  end

  def edit
    @item = Item.find(params[:id])
    render 'items/new'
  end

  def update
    @item = Item.find(params[:id])
    @item.update_attributes(params[:item])
    if @item.save
      redirect_to @item.post ? edit_post_path(@item.post) : '/'
    else
      render 'items/new'
    end
  end
end