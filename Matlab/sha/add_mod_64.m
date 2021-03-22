function add_mod_ = add_mod_64(s_u_m)
md_sum = char();
lsize=length(s_u_m);

for i=1:lsize
    if(i==1)
    md_sum=strcat(md_sum,num2str(mod(s_u_m(end),2)));        
    elseif(i>1)
    md_sum=strcat(num2str(mod((s_u_m(end-(i-1))+fix(s_u_m(end-(i-2))/2)),2)), md_sum);
    s_u_m(end-(i-1))=s_u_m(end-(i-1)) + fix(s_u_m(end-(i-2))/2);
    end
end

add_mod_=md_sum;
end

