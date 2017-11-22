#!/usr/bin/env ruby

require 'xcodeproj'
require 'tempfile'
require 'fileutils'

Dir.chdir('ios')

@podfile_path = Pathname.pwd + 'Podfile'
@pod_dep = "  pod 'TwitterKit', '3.1.1'\n"

@project_paths= Pathname.pwd.children.select { |pn| pn.extname == '.xcodeproj' }
raise 'No Xcode project found' unless @project_paths.length > 0
raise 'Multiple Xcode projects found' unless @project_paths.length == 1
project_path = @project_paths.first

project = Xcodeproj::Project.open(project_path)
main_target = project.targets.first

puts "Checking Podfile in iOS project #{@podfile_path}"

if File.exist? @podfile_path
  puts 'Found an existing Podfile'
  lines = File.readlines(@podfile_path)
  if lines.grep(/pod\s'TwitterKit'/).size == 0
    puts "Adding the TwitterKit pod to Podfile\n"
    temp_file = Tempfile.new('Podfile_temp')
    begin
      escaped_target_name = main_target.name.gsub(/'/, "\\\\\'")
      lines.each do |line|
        temp_file.puts(line)
        temp_file.puts(@pod_dep) if line =~ /target\s+'#{escaped_target_name}'\s+do/
      end
      temp_file.close
      FileUtils.mv(temp_file.path, @podfile_path)
    ensure
      temp_file.delete
    end
  else
    puts "TwitterKit pod is already added in Podfile\n"
  end
else
  puts 'Adding Podfile to iOS project'
  podfile = ''

  podfile << "platform :ios, '9.0'\n"
  podfile << "\ntarget '#{main_target.name.gsub(/'/, "\\\\\'")}' do\n"
  podfile << @pod_dep
  podfile << "end\n"
  puts podfile
  File.write(@podfile_path, podfile)
end

puts 'Installing Pods'

system 'pod install'
