module ApplicationHelpers
  def github_file_url(file_path, version)
    major_version = version.to_s.split(".").first
    if major_version == "1"
      "https://github.com/thoughtbot/neat/blob/v#{version}/app/assets/stylesheets/#{file_path}"
    else
      "https://github.com/thoughtbot/neat/blob/v#{version}/core/#{file_path}"
    end
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
    URI.join(ENV.fetch("URL"), path)
  end

  def svg(name)
    root = Middleman::Application.root
    images_path = config[:images_dir]
    file_path = "#{root}/source/#{images_path}/#{name}.svg"

    return File.read(file_path) if File.exists?(file_path)
    "(SVG not found)"
  end

  def inline_stylesheet(path)
    asset = sprockets["#{ path }.css"]

    content_tag(:style, asset.to_s, { type: 'text/css' })
  end

  def code_block path
    asset = sprockets["#{path}.scss"]
    asset_contents = IO.read(asset.pathname)

    content_tag(:code, asset_contents)
  end

  def sorted_versions(versions)
    versions.sort { |a, b| b.to_s <=> a.to_s }
  end
end
