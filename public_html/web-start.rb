#!/bin/env ruby
require 'webrick'  
include WEBrick
s = HTTPServer.new(:Port => 3000, :DocumentRoot    => '/')
 s.mount('/', HTTPServlet::FileHandler, '/home/tony/Progetti/OrarioSettimanale/public_html/',true)
trap 'INT' do s.shutdown end
puts 'Hit ^C to stop serving pages.'
s.start
