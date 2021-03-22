function [digest, MSG_RAW_512] = hash(LEN,METH,GEN)
%function [digest, MSG_PADDED] = hash(LEN,METH,GEN)
% hash(LEN,METH,GEN)
% Generates Message Digest using algorithms : SHA1, SHA-224, SHA256
% Currently implemented only SHA-1
%           Support for Bit Oriented Message
%           -- Enter Message Length in Bits
%           -- Either enter Message (HEX) or 
%           -- generate a random message of length LEN in Bits
%           -- Select the Algorithm to generate MESG DIGEST
%              
%              LEN  :: Enter Bit Oriented Message Length
%                      should be GT 0
%
%              METH :: SHA1, SHA224,SHA256,SHA384,SHA512
%
%              GEN  :: 0 --> enter the MESG (in HEX) or 
%
%                      Limitation :: Matlab cannot read characters if MSG_LEN > 2^12
%                      ----- directly assign MSG to msg_str if MESG_LENGTH > 2^12
%
%                      1 --> this HASH function  generates a psuodorandom
%                            mesg. of length LEN bits
%                            <> No. of Bits in MESG should be GT LEN 
%                            <> AT the CMD prompt dont give any spaces
%                            <> while entering HEX MESG
%
%                     -- < Remember KEY to SECURITY Algorithms are modular Arithmetic >
%                     
%           -- Verfied variables (a, b,c,d,e) over 80 rounds against 
%               FIPS-180-2 examaples
%           -- I dont Guarantee, if threatened by 
%              BIT Resolution/overflow/underflow
%
%
%           -- Kshitish, MAXIM IDC   
%
%
% end

%SHA-160 INITIAL KEYS

%%% Debug
%LEN=24;
%METH='SHA256';
%GEN=1;

%% const. for SHA224 & SHA256
%LEN=448;
%METH='SHA224';
%GEN=1;

SHA160=0;
SHA224=0;
SHA256=0;
SHA384=0;
SHA512=0;

    if(METH=='SHA160')
    SHA160=1;
    elseif(METH=='SHA224')
    SHA224=1;
    elseif(METH=='SHA256')
    SHA256=1;
    elseif(METH=='SHA384')
    SHA384=1;
    elseif(METH=='SHA512')
    SHA512=1;
    end


SHA224_256     = SHA224 | SHA256; 
SHA160_224_256 = SHA160 | SHA224 | SHA256; 

SHA384_512 = SHA384 | SHA512;
SHA384     = SHA384 ;
SHA512     = SHA384 ;


   if(SHA160_224_256)
    PAD_ZERO=64;
    MFACT=1;
    elseif(SHA384_512)
        PAD_ZERO=64*2;
        MFACT=2;
    end

 MSG_SZ_P_BLK=512*MFACT;
 MOD_SZ_BLK  = 448*MFACT; 

KT=['428a2f98'; '71374491'; 'b5c0fbcf'; 'e9b5dba5'; '3956c25b'; '59f111f1'; '923f82a4'; 'ab1c5ed5';
    'd807aa98'; '12835b01'; '243185be'; '550c7dc3'; '72be5d74'; '80deb1fe'; '9bdc06a7'; 'c19bf174';
    'e49b69c1'; 'efbe4786'; '0fc19dc6'; '240ca1cc'; '2de92c6f'; '4a7484aa'; '5cb0a9dc'; '76f988da';
    '983e5152'; 'a831c66d'; 'b00327c8'; 'bf597fc7'; 'c6e00bf3'; 'd5a79147'; '06ca6351'; '14292967';
    '27b70a85'; '2e1b2138'; '4d2c6dfc'; '53380d13'; '650a7354'; '766a0abb'; '81c2c92e'; '92722c85';
    'a2bfe8a1'; 'a81a664b'; 'c24b8b70'; 'c76c51a3'; 'd192e819'; 'd6990624'; 'f40e3585'; '106aa070';
    '19a4c116'; '1e376c08'; '2748774c'; '34b0bcb5'; '391c0cb3'; '4ed8aa4a'; '5b9cca4f'; '682e6ff3';
    '748f82ee'; '78a5636f'; '84c87814'; '8cc70208'; '90befffa'; 'a4506ceb'; 'bef9a3f7'; 'c67178f2'];


KT64=[
    '428a2f98d728ae22'; '7137449123ef65cd'; 'b5c0fbcfec4d3b2f'; 'e9b5dba58189dbbc';
    '3956c25bf348b538'; '59f111f1b605d019'; '923f82a4af194f9b'; 'ab1c5ed5da6d8118';
    'd807aa98a3030242'; '12835b0145706fbe'; '243185be4ee4b28c'; '550c7dc3d5ffb4e2';
    '72be5d74f27b896f'; '80deb1fe3b1696b1'; '9bdc06a725c71235'; 'c19bf174cf692694';
    'e49b69c19ef14ad2'; 'efbe4786384f25e3'; '0fc19dc68b8cd5b5'; '240ca1cc77ac9c65';
    '2de92c6f592b0275'; '4a7484aa6ea6e483'; '5cb0a9dcbd41fbd4'; '76f988da831153b5';
    '983e5152ee66dfab'; 'a831c66d2db43210'; 'b00327c898fb213f'; 'bf597fc7beef0ee4';
    'c6e00bf33da88fc2'; 'd5a79147930aa725'; '06ca6351e003826f'; '142929670a0e6e70';
    '27b70a8546d22ffc'; '2e1b21385c26c926'; '4d2c6dfc5ac42aed'; '53380d139d95b3df';
    '650a73548baf63de'; '766a0abb3c77b2a8'; '81c2c92e47edaee6'; '92722c851482353b';
    'a2bfe8a14cf10364'; 'a81a664bbc423001'; 'c24b8b70d0f89791'; 'c76c51a30654be30';
    'd192e819d6ef5218'; 'd69906245565a910'; 'f40e35855771202a'; '106aa07032bbd1b8';
    '19a4c116b8d2d0c8'; '1e376c085141ab53'; '2748774cdf8eeb99'; '34b0bcb5e19b48a8';
    '391c0cb3c5c95a63'; '4ed8aa4ae3418acb'; '5b9cca4f7763e373'; '682e6ff3d6b2b8a3';
    '748f82ee5defb2fc'; '78a5636f43172f60'; '84c87814a1f0ab72'; '8cc702081a6439ec';
    '90befffa23631e28'; 'a4506cebde82bde9'; 'bef9a3f7b2c67915'; 'c67178f2e372532b';
    'ca273eceea26619c'; 'd186b8c721c0c207'; 'eada7dd6cde0eb1e'; 'f57d4f7fee6ed178';
    '06f067aa72176fba'; '0a637dc5a2c898a6'; '113f9804bef90dae'; '1b710b35131c471b';
    '28db77f523047d84'; '32caab7b40c72493'; '3c9ebe0a15c9bebc'; '431d67c49c100d4c';
    '4cc5d4becb3e42b6'; '597f299cfc657e2a'; '5fcb6fab3ad6faec'; '6c44198c4a475817'];
HT64_512=[
'6a09e667f3bcc908',
'bb67ae8584caa73b',
'3c6ef372fe94f82b',
'a54ff53a5f1d36f1',
'510e527fade682d1',
'9b05688c2b3e6c1f',
'1f83d9abfb41bd6b',
'5be0cd19137e2179'
];


HT64_384=[
'cbbb9d5dc1059ed8', 
'629a292a367cd507',
'9159015a3070dd17',
'152fecd8f70e5939',
'67332667ffc00b31',
'8eb44a8768581511',
'db0c2e0d64f98fa7',
'47b5481dbefa4fa4',
];


%%% Initial HASH values for
% SHA160, SHA224 and SHA256
% 

if(METH == 'SHA160')
h0 = dec2bin(hex2dec('67452301'),32);
h1 = dec2bin(hex2dec('EFCDAB89'),32);
h2 = dec2bin(hex2dec('98BADCFE'),32);
h3 = dec2bin(hex2dec('10325476'),32);
h4 = dec2bin(hex2dec('C3D2E1F0'),32);
elseif (METH == 'SHA224')
h0 = dec2bin(hex2dec('c1059ed8'),32);
h1 = dec2bin(hex2dec('367cd507'),32);
h2 = dec2bin(hex2dec('3070dd17'),32);
h3 = dec2bin(hex2dec('f70e5939'),32);
h4 = dec2bin(hex2dec('ffc00b31'),32);    
h5 = dec2bin(hex2dec('68581511'),32);
h6 = dec2bin(hex2dec('64f98fa7'),32);
h7 = dec2bin(hex2dec('befa4fa4'),32);    
elseif (METH == 'SHA256')
h0 = dec2bin(hex2dec('6a09e667'),32);
h1 = dec2bin(hex2dec('bb67ae85'),32);
h2 = dec2bin(hex2dec('3c6ef372'),32);
h3 = dec2bin(hex2dec('a54ff53a'),32);
h4 = dec2bin(hex2dec('510e527f'),32);
h5 = dec2bin(hex2dec('9b05688c'),32);
h6 = dec2bin(hex2dec('1f83d9ab'),32);
h7 = dec2bin(hex2dec('5be0cd19'),32);
elseif(METH=='SHA512')
h0=convt_64bin(HT64_512(1,:));
h1=convt_64bin(HT64_512(2,:));
h2=convt_64bin(HT64_512(3,:));
h3=convt_64bin(HT64_512(4,:));
h4=convt_64bin(HT64_512(5,:));
h5=convt_64bin(HT64_512(6,:));
h6=convt_64bin(HT64_512(7,:));
h7=convt_64bin(HT64_512(8,:));
elseif (METH=='SHA384')

h0=convt_64bin(HT64_384(1,:));
h1=convt_64bin(HT64_384(2,:));
h2=convt_64bin(HT64_384(3,:));
h3=convt_64bin(HT64_384(4,:));
h4=convt_64bin(HT64_384(5,:));
h5=convt_64bin(HT64_384(6,:));
h6=convt_64bin(HT64_384(7,:));
h7=convt_64bin(HT64_384(8,:));

end


INV_M  =dec2bin(hex2dec('FFFFFFFF'), 32);
%%INV_M64=dec2bin(hex2dec('FFFFFFFF'), 64);
INV_M64=num2str(ones(64,1))';

if LEN < 0 
    disp ('--- EXIT STATUS: Invalid MESG LENGTH ENTERED---');
    disp (' RE-ENTER MESG LENGTH, valid entries are 0-512' );
    disp ('---------------------------------');
    return 
elseif(LEN>=1)
%%%% Generate MESG
% 1. ONEs
% 2. ZEROs
% 3. ALTERNATING ONE-ZEROs
mesg_d=((sign(rand(1,LEN)-0.5)) + 1) *0.5;
%mesg_d = zeros(1,LEN); 
%mesg_d = ones(1,LEN); 
for u=1:LEN
   mesg_d(u)=mod(u,2);
end

end 

if(GEN==1)
msg_str=char();
k=0;
if(LEN>0)
for i=1:length(mesg_d),
        msg_str      = strcat(msg_str,num2str(mesg_d(i))) ;
end
end
elseif(GEN==0) 
MESG=input('Enter MESG in HEX format (onlyif MESG length is <2^12)','s');
msg_str=char();
%----- directly assign MSG to msg_str if MESG_LENGTH > 2^12

for i=1:length(MESG),
        msg_str      = strcat(msg_str,dec2bin(hex2dec(MESG(i)),4));
      
end
msg_str=msg_str(1:LEN);
end


%disp('RAW MSG(BITS) bfore preprocessed is');
%disp(msg_str);

MSG_RAW_512=char();
raw_str=char();
raw_str=msg_str;


        blk_num = fix(length(msg_str)/(512*MFACT)) ;
        if(mod(length(msg_str),(512*MFACT)) ==0)
        blk_num = blk_num -1;
        end
       if(blk_num<0)
           blk_num=0;
           end
        extnd=512*MFACT*(blk_num+1)-mod(length(msg_str),(512*MFACT));
        raw_str(end+1:end+extnd)= num2str(round(rand(1,extnd))')';
        raw_str;
    for k=1:128*(blk_num+1)*MFACT
        MSG_RAW_512 = strcat(MSG_RAW_512,dec2hex(bin2dec(raw_str(4*(k-1)+1:4*k))));
    end

%Debug
%msg_str='011000010110001001100011'; %%%FIPS ex-1
%msg_str='01011110';                 FIPS ex-2
%msg_str='010010011011001010101110110000100101100101001011101111100011101000111011000100010111010101000010110110010100101011001000100';
%
 
 %% l+k+1 is congruent to 448 mod 512
 %  FIND MINIMUM (0 or non-negetaive) K 
 %  to satisfy
 %
 %          L+K+1 = 448 mod 512
 %          L+K+1 is congruent to 448 
 % solve mod(|(L+K+1) - 448 |, 512) = 0
 %          
 
msg_str(end+1) = '1';
   int_k=0;
   diff_k = abs(int_k+LEN+1-448*MFACT); 

    while(mod(diff_k,512*MFACT) ~=0)
    
    int_k  = int_k +1;
    diff_k = abs(int_k+LEN+1-448*MFACT); 
    end

    k=int_k;
 
 tpr=sprintf('Min. K satisfying l+k+1 = %d mod %d is %d ', MOD_SZ_BLK, MSG_SZ_P_BLK,k);
% disp(tpr);

msg_str(end+1:end+k)='0'; %% Pad K-bits of '0's

len_bits=dec2bin(LEN,PAD_ZERO); %% 64-bit representation of MSG_LEN

MSG_2_PROC=cat(2,msg_str,len_bits); %%MESG after PreProcess 

MSG_PADDED=char();
no_512_blk=length(MSG_2_PROC)/MSG_SZ_P_BLK;

 for k=1:(128*MFACT)*(no_512_blk)
        MSG_PADDED = strcat(MSG_PADDED,dec2hex(bin2dec(MSG_2_PROC(4*(k-1)+1:4*k))));
    end

%11000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
%59C4526AA2CC59F9A5F56B5579BA7108E7CCB61A
%% Check if Preprocess Happened 
%  correctly 

%%disp('---+++');
%%disp(MSG_2_PROC);
%%disp('blk_num is');
%%disp(blk_num);
%%disp('---+++');
MSG_L = length(MSG_2_PROC);
N=0;
if (mod(MSG_L,512*MFACT) == 0)
   %%disp('MESG PreProcessing is COrrect');
   %%disp('MESG(with padding) to be hashed is ::');
   %%disp(MSG_2_PROC);
    N=MSG_L/(512*MFACT);
    tprint=sprintf('No. of %d-bit MESG chunks=%d', MSG_SZ_P_BLK, N);
    %disp(tprint); 
else 
    disp('Error in MESG PreProcessing');
    disp('Check');
    return
end

%%% Process MSG BLKs
for blk_num=1:N
    padded_msg=MSG_2_PROC((512*MFACT*(blk_num-1)+1):blk_num*512*MFACT);


if( METH == 'SHA160')
%% Parse MESG WORDs
for i=1:16,
        for q=1:32
        %W(i,q)=str2num(MSG_2_PROC(32*(i-1)+q));
        W(i,q)=str2num(padded_msg(32*(i-1)+q));
        end
end


 for i=17:80

     temp1=bitxor(W(i-3,:),W(i-8,:));
     temp2=bitxor(W(i-14,:),W(i-16,:));
     temp3=bitxor(temp1,temp2);
     temp = cat(2,temp3,temp3(1:1));
     W(i,:)=temp(2:end);
 end

%% Parse MESG WORD ENDS


 for j=1:32
       a(j)=str2num(h0(j));
       b(j)=str2num(h1(j));
       c(j)=str2num(h2(j));
       d(j)=str2num(h3(j));
       e(j)=str2num(h4(j));
       bitmask(j)=str2num(INV_M(j));
    end


 for i=1:80
     if (i<= 20)
         not_b= bitxor(b,bitmask);
         bd   = bitand(not_b,d);
         bc   = bitand(b,c);
         f    = bitxor(bc,bd);
         k    = dec2bin(hex2dec('5A827999'),32); 
         
     elseif ((i >= 21) && (i <= 40))
         f    = bitxor(bitxor(b,c), d);
         k    = dec2bin(hex2dec('6ED9EBA1'),32);

     elseif (i >=41) && (i <= 60)

         bc   = bitand(b,c);
         bd   = bitand(b,d);
         cd   = bitand(c,d);
     
         f    = bitxor(bitxor(bc,bd),cd);
         k    = dec2bin(hex2dec('8F1BBCDC'),32);

     elseif (i>=61) && (i<=80)
         f    = bitxor(bitxor(b,c), d);
         k    = dec2bin(hex2dec('CA62C1D6'),32);
     end
         
         rol_a=5;
         a_l_5 = cat(2,a,a(1:rol_a));
         
         add1  = mod( (bin2dec(num2str(a_l_5((rol_a+1):end)')') + bin2dec(num2str(f')')), 4294967296);

         add2  = mod( (bin2dec(num2str(e')') + add1), 4294967296);
         
         add3  = mod( (add2 + bin2dec(num2str(k')')), 4294967296);

      %   tempx = mod( (add3 + bin2dec(num2str(W(i,:)')')), 4294967296);

         raw_add =   bin2dec(num2str(a_l_5((rol_a+1):end)')') + bin2dec(num2str(f')') + bin2dec(num2str(e')') + bin2dec(num2str(k')') + bin2dec(num2str(W(i,:)')') ;


         tempx = mod(raw_add,4294967296 );  %% 

         e      = d ;
         d      = c ;
         rol_b  = 30;
         b_l_30 = cat(2,b,b(1:rol_b));
         c      = b_l_30((rol_b+1):end);
         b = a ;
         numd=dec2bin(tempx,32);

         atmp(i,:)=numd;
         for z=1:32
         a(z)=str2num(numd(z));
         end

         btmp(i,:)=b;
         ctmp(i,:)=c;
         dtmp(i,:)=d;
         etmp(i,:)=e;
         ftmp(i,:)=f;
         ktmp(i,:)=k;


         end

 h0_dec = mod(bin2dec(h0) + bin2dec(num2str(a')'), 4294967296);
 h1_dec = mod(bin2dec(h1) + bin2dec(num2str(b')'), 4294967296);
 h2_dec = mod(bin2dec(h2) + bin2dec(num2str(c')'), 4294967296);
 h3_dec = mod(bin2dec(h3) + bin2dec(num2str(d')'), 4294967296);
 h4_dec = mod(bin2dec(h4) + bin2dec(num2str(e')'), 4294967296);

 %debug 
 %
 h0 = dec2bin(h0_dec,32);
 
 h1 = dec2bin(h1_dec,32);
 h2 = dec2bin(h2_dec,32);
 h3 = dec2bin(h3_dec,32);
 h4 = dec2bin(h4_dec,32);

 H0 = (dec2hex(h0_dec,8));
 H1 = (dec2hex(h1_dec,8));
 H2 = (dec2hex(h2_dec,8));
 H3 = (dec2hex(h3_dec,8));
 H4 = (dec2hex(h4_dec,8));
 
 digest = char();

 digest = strcat(H0,H1,H2,H3,H4);

elseif ((METH == 'SHA256') | (METH == 'SHA224') )
    
%% Parse MESG WORDs
for i=1:16,
        for q=1:32
        %W(i,q)=str2num(MSG_2_PROC(32*(i-1)+q));
        W(i,q)=str2num(padded_msg(32*(i-1)+q));
        end
end

for i=17:64

%   Cal Sigma1(W(t-12))

    tmp1=W(i-2,:);
    tmp_ror= cat(2,tmp1(end-16:end),tmp1);
    ror_17 = tmp_ror(1:32);

    tmp_ror= cat(2,tmp1(end-18:end),tmp1);
    ror_19 = tmp_ror(1:32);

    tmp_sh= cat(2,tmp1(end-9:end),tmp1);
    shr_10  = tmp_sh(1:32);
    shr_10(1,[1:10])=0;

    tmpx1  = bitxor(ror_17, ror_19);
    sigma1 = bitxor(shr_10,tmpx1); 

%   Cal Sigma0(W(t-15))

    tmp1=W(i-15,:);

    tmp_ror = cat(2,tmp1(end-6:end),tmp1);
    ror_7   = tmp_ror(1:32);

    tmp_ror = cat(2,tmp1(end-17:end),tmp1);
    ror_18  = tmp_ror(1:32);

    tmp_sh  = cat(2,tmp1(end-2:end),tmp1);
    shr_3   = tmp_sh(1:32);
    shr_3(1,[1:3])=0;

    tmpx1   = bitxor(ror_7, ror_18);
    sigma0  = bitxor(shr_3, tmpx1); 

    tmp_add = mod((bin2dec(num2str(sigma1')') + bin2dec(num2str(sigma0')') + bin2dec(num2str((W(i-7,:))')') + bin2dec(num2str((W(i-16,:))')')),4294967296);  

    W(i,:)  = str2num(dec2bin(tmp_add,32)')';
end


 for j=1:32
       a(j)=str2num(h0(j));
       b(j)=str2num(h1(j));
       c(j)=str2num(h2(j));
       d(j)=str2num(h3(j));
       e(j)=str2num(h4(j));

       f(j)=str2num(h5(j));
       g(j)=str2num(h6(j));
       h(j)=str2num(h7(j));
       bitmask(j)=str2num(INV_M(j));
    end


 for i=1:64
      
      ror_6  = cat(2, e(end-5:end),e);
      ror_6=ror_6(1:32);

      ror_11 = cat(2, e(end-10:end),e);ror_11=ror_11(1:32);

      ror_25 = cat(2, e(end-24:end),e);ror_25=ror_25(1:32);

      tmp_ror = bitxor(ror_6, ror_11); 
      S_SIG1  = bitxor(tmp_ror, ror_25);

      not_e   = bitxor(e,bitmask);
      and_ef  = bitand(e,f);
      and_fg  = bitand(not_e,g);
      ch_efg  = bitxor(and_ef, and_fg);

      add_t1  = mod((bin2dec(num2str(h')') + bin2dec(num2str(S_SIG1')') + bin2dec(num2str(ch_efg')') + hex2dec(KT(i,:)) + bin2dec(num2str(W(i,:)')')), 4294967296) ; 
    
      ror_2  = cat(2, a(end-1:end),a);
      ror_2  = ror_2(1:32);
      ror_13 = cat(2, a(end-12:end),a);
      ror_13 = ror_13(1:32);
      ror_22 = cat(2, a(end-21:end),a);
      ror_22 = ror_22(1:32);

      tmp_ror = bitxor(ror_2, ror_13); 
      S_SIG0  = bitxor(tmp_ror, ror_22);

      and_ab  = bitand(a,b); 
      and_bc  = bitand(b,c);
      and_ac  = bitand(a,c);

      xor_ab_bc = bitxor(and_ab,and_bc);
      
      maj_abc = bitxor(xor_ab_bc,and_ac);
      
      add_t2  = mod((bin2dec(num2str(maj_abc')') +  bin2dec(num2str(S_SIG0')')), 4294967296);  

      h=g;
      g=f;
      f=e;
      int_e= mod((bin2dec(num2str(d')')+add_t1),4294967296 );
      numd=dec2bin(int_e,32);
      for z=1:32
         e(z)=str2num(numd(z));
         end
      d=c;
      c=b;
      b=a;
      int_a=mod((add_t1 + add_t2), 4294967296);
      numd=dec2bin(int_a,32);
      for z=1:32
      a(z)=str2num(numd(z));
      end
 end

 h0_dec = mod(bin2dec(h0) + bin2dec(num2str(a')'), 4294967296);
 h1_dec = mod(bin2dec(h1) + bin2dec(num2str(b')'), 4294967296);
 h2_dec = mod(bin2dec(h2) + bin2dec(num2str(c')'), 4294967296);
 h3_dec = mod(bin2dec(h3) + bin2dec(num2str(d')'), 4294967296);
 h4_dec = mod(bin2dec(h4) + bin2dec(num2str(e')'), 4294967296);
 h5_dec = mod(bin2dec(h5) + bin2dec(num2str(f')'), 4294967296);
 h6_dec = mod(bin2dec(h6) + bin2dec(num2str(g')'), 4294967296);
 h7_dec = mod(bin2dec(h7) + bin2dec(num2str(h')'), 4294967296);

 %debug 
 %
 h0 = dec2bin(h0_dec,32);
 h1 = dec2bin(h1_dec,32);
 h2 = dec2bin(h2_dec,32);
 h3 = dec2bin(h3_dec,32);
 h4 = dec2bin(h4_dec,32);
 h5 = dec2bin(h5_dec,32);
 h6 = dec2bin(h6_dec,32);
 h7 = dec2bin(h7_dec,32);


 H0 = (dec2hex(h0_dec,8));
 H1 = (dec2hex(h1_dec,8));
 H2 = (dec2hex(h2_dec,8));
 H3 = (dec2hex(h3_dec,8));
 H4 = (dec2hex(h4_dec,8));
 H5 = (dec2hex(h5_dec,8));
 H6 = (dec2hex(h6_dec,8));
 H7 = (dec2hex(h7_dec,8));
 
 digest = char();
 digest = strcat(H0,H1,H2,H3,H4, H5,H6, H7);

 if(METH=='SHA224')
 digest = char();
 digest = strcat(H0,H1,H2,H3,H4, H5,H6);
 end

%%% Here goes SHA384

elseif ((METH == 'SHA384') | (METH == 'SHA512') )
%% Parse MESG WORDs
for i=1:16,
        for q=1:64
        W(i,q)=str2num(padded_msg(64*(i-1)+q));
        end
end

       for i=17:80

   %   Cal Sigma1(W(t-12))

       tmp1=W(i-2,:);
       tmp_ror= cat(2,tmp1(end-18:end),tmp1); 
       ror_19 = tmp_ror(1:64);

       tmp_ror= cat(2,tmp1(end-60:end),tmp1);
       ror_61 = tmp_ror(1:64);

       tmp_sh= cat(2,tmp1(end-5:end),tmp1);
       shr_6  = tmp_sh(1:64);
       shr_6(1,[1:6])=0;

       tmpx1  = bitxor(ror_19, ror_61);
       sigma1 = bitxor(shr_6,tmpx1); 

   %   Cal Sigma0(W(t-15))

       tmp1=W(i-15,:);

       tmp_ror = cat(2,tmp1(end-0:end),tmp1);
       ror_1   = tmp_ror(1:64);

       tmp_ror = cat(2,tmp1(end-7:end),tmp1);
       ror_8   = tmp_ror(1:64);

       tmp_sh  = cat(2,tmp1(end-6:end),tmp1);
       shr_7   = tmp_sh(1:64);
       shr_7(1,[1:7])=0;

       tmpx1   = bitxor(ror_1, ror_8);
       sigma0  = bitxor(shr_7, tmpx1); 

       %%tmp_add = mod((bin2dec2(num2str(sigma1')') + bin2dec2(num2str(sigma0')') + bin2dec2(num2str((W(i-7,:))')') + bin2dec2(num2str((W(i-16,:))')')),(2^64));  
       tmp_add   = sigma1 + sigma0 + W(i-7,:) + W(i-16,:);  

       W(i,:)  = str2num(add_mod_64(tmp_add)')';
   end


 for j=1:64
       a(j)=str2num(h0(j));
       b(j)=str2num(h1(j));
       c(j)=str2num(h2(j));
       d(j)=str2num(h3(j));
       e(j)=str2num(h4(j));

       f(j)=str2num(h5(j));
       g(j)=str2num(h6(j));
       h(j)=str2num(h7(j));
       bitmask(j)=str2num(INV_M64(j));
    end


 for i=1:80
      
      ror_14  = cat(2, e(end-13:end),e);ror_14=ror_14(1:64);
      ror_18  = cat(2, e(end-17:end),e);ror_18=ror_18(1:64);
      ror_41  = cat(2, e(end-40:end),e);ror_41=ror_41(1:64);


      tmp_ror = bitxor(ror_14, ror_18); 
      S_SIG1  = bitxor(tmp_ror, ror_41);

      not_e   = bitxor(e,bitmask);
      and_ef  = bitand(e,f);
      and_fg  = bitand(not_e,g);
      ch_efg  = bitxor(and_ef, and_fg);

      add_sum1 = h + S_SIG1 + ch_efg + str2num(convt_64bin(KT64(i,:))')' + W(i,:) ; 
    
      ror_28  = cat(2, a(end-27:end),a); ror_28  = ror_28(1:64);
      ror_34 = cat(2, a(end-33:end),a);  ror_34 = ror_34(1:64);
      ror_39 = cat(2, a(end-38:end),a);  ror_39 = ror_39(1:64);

      tmp_ror = bitxor(ror_28, ror_34); 
      S_SIG0  = bitxor(tmp_ror, ror_39);

      and_ab  = bitand(a,b); 
      and_bc  = bitand(b,c);
      and_ac  = bitand(a,c);

      xor_ab_bc = bitxor(and_ab,and_bc);
      
      maj_abc = bitxor(xor_ab_bc,and_ac);
      
      add_sum2  = maj_abc +  S_SIG0 ;  

      h=g;
      g=f;
      f=e;
      int_e= add_mod_64(add_sum1+d);
      for z=1:64
         e(z)=str2num(int_e(z));
         end
      d=c;
      c=b;
      b=a;
      int_a= add_mod_64 (add_sum1 + add_sum2);

      for z=1:64
      a(z)=str2num(int_a(z));
      end
 end

 h0_bin = add_mod_64(str2num(h0')' + a);
 h1_bin = add_mod_64(str2num(h1')' + b);
 h2_bin = add_mod_64(str2num(h2')' + c);
 h3_bin = add_mod_64(str2num(h3')' + d);
 h4_bin = add_mod_64(str2num(h4')' + e);
 h5_bin = add_mod_64(str2num(h5')' + f);
 h6_bin = add_mod_64(str2num(h6')' + g);
 h7_bin = add_mod_64(str2num(h7')' + h);

h0 = h0_bin;
h1 = h1_bin;
h2 = h2_bin;
h3 = h3_bin;
h4 = h4_bin;
h5 = h5_bin;
h6 = h6_bin;
h7 = h7_bin;


 H0=char();
 H1=char();
 H2=char();
 H3=char();
 H4=char();
 H5=char();
 H6=char();
 H7=char();




 for i=1:16

 H0 = strcat(dec2hex(bin2dec(h0_bin(end-((4*i)-1):end-(4*(i-1))))),H0);
 H1 = strcat(dec2hex(bin2dec(h1_bin(end-((4*i)-1):end-(4*(i-1))))),H1);
 H2 = strcat(dec2hex(bin2dec(h2_bin(end-((4*i)-1):end-(4*(i-1))))),H2);
 H3 = strcat(dec2hex(bin2dec(h3_bin(end-((4*i)-1):end-(4*(i-1))))),H3);
 H4 = strcat(dec2hex(bin2dec(h4_bin(end-((4*i)-1):end-(4*(i-1))))),H4);
 H5 = strcat(dec2hex(bin2dec(h5_bin(end-((4*i)-1):end-(4*(i-1))))),H5);
 H6 = strcat(dec2hex(bin2dec(h6_bin(end-((4*i)-1):end-(4*(i-1))))),H6);
 H7 = strcat(dec2hex(bin2dec(h7_bin(end-((4*i)-1):end-(4*(i-1))))),H7);
end
 
digest = char();
digest = strcat(H0,H1,H2,H3,H4, H5,H6, H7);

if(METH=='SHA384')

digest = char();
digest = strcat(H0,H1,H2,H3,H4, H5);
end





 end
 end
 
tsc=sprintf('++++ HASH generated using ALgorithm %s = %s', METH,digest);
disp(tsc); 

 return



