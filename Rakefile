require "bundler"

task :default => [:generate]

desc "generate a docs json output file for the gem version defined in Gemfile"
task :generate do
  neat_path = Bundler.load.specs.find{|s| s.name == "neat" }.full_gem_path

  assets_dir = "#{neat_path}/core"

  # ~/.gem/ruby/2.2.0/gems/neat-4.2.1 => "4_2_1"
  version_number = neat_path.scan(/(\d\.\d\.\d)+/).last.last.gsub(/\./, "_")

  system("sassdoc #{assets_dir} -p > data/neat_#{version_number}.json")
end

desc "generate docs for a specific version number"
task :generate_for do
  ARGV.each { |a| task a.to_sym do ; end }
  number = ARGV[1]

  fail "\nplease provide version number\n\n" unless number

  puts "downloading version #{number}"
  system("curl -L https://api.github.com/repos/thoughtbot/neat/tarball/v#{number} > neat.tar.gz")

  system("tar -zxf neat.tar.gz")

  downloaded_dir = Dir['**'].last
  version_number = number.gsub(/\./, "_")

  if downloaded_dir =~ /thoughtbot-neat-/

    puts "mixing documentation for neat #{number}"
    assets_dir = "#{downloaded_dir}/app/assets/stylesheets"
    new_file = "data/neat_#{version_number}.json"
    system("sassdoc #{assets_dir} -p > #{new_file}")

    puts "cleaning up"
    system("rm -rf neat.tar.gz")
    system("rm -rf #{downloaded_dir}")

    puts "all done!"
    puts "please check the new file: #{new_file}"
  end
end
