desc "Generate documentation for a published version of Neat"
task :generate_docs_for do
  ARGV.each { |a| task a.to_sym do ; end }
  version = ARGV[1]
  version_slug = version.gsub(/\./, "_")

  fail "\nPlease provide version number\n\n" unless version

  workspace = "tmp/neat"
  system("mkdir -p #{workspace}")

  puts "Downloading Neat v#{version}"
  archive = "#{workspace}/neat.tar.gz"
  archive_contents = "#{workspace}/neat_#{version_slug}"
  system("curl -L https://api.github.com/repos/thoughtbot/neat/tarball/v#{version} > #{archive}")
  system("mkdir -p #{archive_contents}")
  system("tar -zxf #{archive} --strip-components=1 -C #{archive_contents}")

  puts "Mixing documentation…"
  data_file = "data/neat_#{version_slug}.json"
  system("npx sassdoc #{archive_contents}/core -p > #{data_file}")

  puts "Cleaning up…"
  system("rm -rf #{workspace}")

  puts "All done!"
  puts "Documentation written to: #{data_file}"
end
