#!/bin/env ruby
require 'webrick'  
include WEBrick
s = HTTPServer.new(:Port => 3000, :DocumentRoot    => '/')
puts "Mounting current directory (#{Dir.pwd}) as DocumentRoot..."
s.mount('/', HTTPServlet::FileHandler, Dir.pwd,true)
trap 'INT' do s.shutdown end
puts 'Hit ^C to stop serving pages.'
s.start
