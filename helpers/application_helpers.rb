module ApplicationHelpers
  def github_file_url(file_path, version)
    "https://github.com/thoughtbot/neat/blob/v#{version}/core/#{file_path}"
  end

  def markdown(contents)
    renderer = Redcarpet::Render::HTML
    markdown = Redcarpet::Markdown.new(
      renderer,
      autolink: true,
      fenced_code_blocks: true,
      footnotes: true,
      highlight: true,
      smartypants: true,
      strikethrough: true,
      tables: true,
      with_toc_data: true
    )
    markdown.render(contents)
  end

  def page_description
    yield_content(:description) || data.site.description
  end

  def page_title
    yield_content(:title) || data.site.title
  end

  def preferred_url
    path = yield_content :preferred_path
    File.join(ENV["SITE_URL"], path, "/")
  end

  def svg(name)
    root = Middleman::Application.root
    file_path = "#{root}/source/images/#{name}.svg"
    return File.read(file_path) if File.exists?(file_path)
    "(not found)"
  end

  def inline_stylesheet(path, **options)
    asset = sprockets["#{ path }.css"]

    content_tag(:style, asset.to_s, { type: 'text/css' }.merge(options))
  end
end
