function sbin=convt_64bin(s)
sbin = char();
for i = 1:length(s)
 sbin=strcat(sbin,dec2bin(hex2dec(s(i)),4));
end
return 
