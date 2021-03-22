toolbox_path = matlab.desktop.editor.getActiveFilename; %   get path of active file
addpath(genpath(toolbox_path(1:end-9)));
format longG

n = [1:1000]; % num of txs
t = 0.01; % duration tx
lag = 0;
for i=(1:1000)
    start = now;
    DataHash(lag, 'SHA-256');
    time = now - start;
    lag(i) = i*t + time;
end
plot(n, lag)
