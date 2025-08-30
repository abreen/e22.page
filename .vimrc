set expandtab
set tabstop=2 shiftwidth=2
"set textwidth=120 colorcolumn=120

set autoread
au CursorHold * checktime

nnoremap gp :silent %!npx prettier --stdin-filepath %<CR>
