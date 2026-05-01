-- styles_react_web.lua
-- React ile Web Uygulama Geliştirme — Pandoc DOCX dönüşüm filtresi
--
-- YOLLAR: Bu filter, kendi konumuna göre görsel yollarını otomatik hesaplar.
-- Klasör yapısı:
--   react-web/
--     pandoc/
--       styles_react_web.lua   ← bu dosya
--       callout_icons/         ← ikonlar buraya
--     assets/auto/diagrams/    ← mermaid PNG'leri buraya

local stringify = pandoc.utils.stringify

-- ── Yol hesaplama ─────────────────────────────────────────────────────────────
-- Bu filter'ın bulunduğu dizin (react-web/pandoc/)
local script_path = PANDOC_SCRIPT_FILE or ''
local script_dir  = script_path:match('(.+)[/\\][^/\\]+$') or '.'
-- Proje kökü (react-web/) = pandoc/ klasörünün bir üstü
local project_root = script_dir:match('(.+)[/\\][^/\\]+$') or '.'

-- Slash normalleştir (Windows uyumluluğu)
script_dir    = script_dir:gsub('\\', '/')
project_root  = project_root:gsub('\\', '/')

local icon_base = script_dir .. '/callout_icons/'

-- ── Yardımcı fonksiyonlar ────────────────────────────────────────────────────
local function has_visible_inlines(inlines)
  return stringify(inlines):match('%S') ~= nil
end

local function file_exists(path)
  local f = io.open(path, 'rb')
  if f then f:close(); return true end
  return false
end

local function icon_inline(src, alt)
  if not src or src == '' or not file_exists(src) then return nil end
  local attr = pandoc.Attr('', {}, {width = '0.17in', height = '0.17in'})
  return pandoc.Image({pandoc.Str(alt)}, src, '', attr)
end

local function clean_inlines(inlines)
  local out = {}
  for _, inline in ipairs(inlines) do
    if inline.t ~= 'LineBreak' and inline.t ~= 'SoftBreak' then
      table.insert(out, inline)
    end
  end
  while #out > 0 and out[1].t == 'Space' do table.remove(out, 1) end
  while #out > 0 and out[#out].t == 'Space' do table.remove(out, #out) end
  return out
end

local function make_styled_para(inlines, style_name)
  return pandoc.Div({pandoc.Para(inlines)},
    pandoc.Attr('', {}, {['custom-style'] = style_name}))
end

local function word_pagebreak()
  return pandoc.RawBlock('openxml', '<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
end

-- ── Callout kutu eşleştirme ───────────────────────────────────────────────────
local function callout_match(label)
  if label:find('Bölüm Hedefi') or label:find('Bolum Hedefi') then
    return {style = 'Bolum Hedefi Kutusu', icon = nil, text = 'Bölüm Hedefi:'}
  end
  if label:find('Dikkat') then
    return {style = 'Dikkat Kutusu',
            icon = icon_base .. 'warning.png', text = 'Dikkat:'}
  end
  if label:find('İpucu') or label:find('Ipucu') then
    return {style = 'Ipucu Kutusu',
            icon = icon_base .. 'bulb.png', text = 'İpucu:'}
  end
  if label:find('Mini özet') or label:find('Mini Ozet') then
    return {style = 'Mini Ozet Kutusu',
            icon = icon_base .. 'target.png', text = 'Mini özet:'}
  end
  if label:find('Alıştırma') or label:find('Alistirma') then
    return {style = 'Alistirma Molasi Kutusu',
            icon = icon_base .. 'pencil.png', text = 'Alıştırma:'}
  end
  if label:find('Sınav Notu') or label:find('Sinav Notu') then
    return {style = 'Sinav Notu Kutusu',
            icon = icon_base .. 'target2.png', text = 'Sınav Notu:'}
  end
  if label:find('Derinlemesine') then
    return {style = 'Derinlemesine Kutusu',
            icon = icon_base .. 'search.png', text = 'Derinlemesine:'}
  end
  if label:find('Laboratuvar') then
    return {style = 'Laboratuvar Ipucu Kutusu', icon = nil, text = 'Laboratuvar:'}
  end
  if label:find('KampüsHub') or label:find('Kampushub') then
    return {style = 'Ipucu Kutusu', icon = nil, text = 'KampüsHub Projesi:'}
  end
  if label:find('Bir sonraki bölüme') then
    return {style = 'Derinlemesine Kutusu', icon = nil,
            text = 'Bir sonraki bölüme geçiş:'}
  end
  return nil
end

local function split_para_segments(para)
  if para.t ~= 'Para' then return nil end
  local segments, current_style, current_inlines = {}, nil, {}
  local skip_next_space = false

  local function flush()
    if current_style and has_visible_inlines(current_inlines) then
      table.insert(segments, {
        style = current_style,
        para  = pandoc.Para(clean_inlines(current_inlines))
      })
    end
    current_inlines = {}
  end

  for _, inline in ipairs(para.content) do
    local matched = nil
    if inline.t == 'Strong' then matched = callout_match(stringify(inline)) end
    if matched then
      flush()
      current_style = matched.style
      local ic = icon_inline(matched.icon, matched.text)
      if ic then
        table.insert(current_inlines, ic)
        table.insert(current_inlines, pandoc.Space())
      end
      table.insert(current_inlines, pandoc.Strong({pandoc.Str(matched.text)}))
      table.insert(current_inlines, pandoc.Space())
      skip_next_space = true
    else
      if current_style then
        if skip_next_space and inline.t == 'Space' then
          skip_next_space = false
        else
          skip_next_space = false
          table.insert(current_inlines, inline)
        end
      end
    end
  end
  flush()
  if #segments > 0 then return segments end
  return nil
end

-- ── Sayfa sonu ───────────────────────────────────────────────────────────────
local function is_latex_pagebreak_text(txt)
  if not txt then return false end
  txt = txt:gsub('\r', ''):gsub('^%s+', ''):gsub('%s+$', '')
  return txt == '\\newpage' or txt == '\\pagebreak' or txt == '\\clearpage'
end

local function is_pagebreak_block(blk)
  if blk.t == 'RawBlock' and blk.format == 'openxml'
     and blk.text and blk.text:find('w:br') and blk.text:find('page') then
    return true
  end
  if blk.t == 'RawBlock'
     and (blk.format == 'tex' or blk.format == 'latex') then
    return is_latex_pagebreak_text(blk.text)
  end
  if blk.t == 'Para' or blk.t == 'Plain' then
    local txt = stringify(blk.content)
    if is_latex_pagebreak_text(txt) then return true end
    if #blk.content == 1 and blk.content[1].t == 'RawInline' then
      local il = blk.content[1]
      if (il.format == 'tex' or il.format == 'latex')
         and is_latex_pagebreak_text(il.text) then return true end
    end
  end
  if blk.t == 'Div' then
    for _, cls in ipairs(blk.classes or {}) do
      if cls == 'pagebreak' or cls == 'newpage' then return true end
    end
  end
  return false
end

local function is_manual_chapter_end_block(blk)
  if blk.t ~= 'Para' and blk.t ~= 'Plain' then return false end
  local txt = stringify(blk.content):gsub('\r',''):gsub('^%s+',''):gsub('%s+$','')
  return txt == 'BÖLÜM SONU' or txt == 'BOLUM SONU'
end

function RawBlock(el)
  if (el.format == 'tex' or el.format == 'latex')
     and is_latex_pagebreak_text(el.text) then
    return word_pagebreak()
  end
end

function Div(el)
  for _, cls in ipairs(el.classes or {}) do
    if cls == 'pagebreak' or cls == 'newpage' then return word_pagebreak() end
  end
end

-- ── Mermaid ───────────────────────────────────────────────────────────────────
local mermaid_counter = 0
local mermaid_image_width = os.getenv('MERMAID_IMAGE_WIDTH') or '4.90in'

local function mermaid_image_candidates(n)
  local fmt = string.format
  return {
    -- Birincil: react-web/assets/auto/diagrams/
    project_root .. fmt('/assets/auto/diagrams/diagram_%03d.png', n),
    project_root .. fmt('/assets/auto/diagrams/diagram_%03d.svg', n),
    -- Geri dönüş: pandoc/ klasörü yanında mermaid_images/
    script_dir   .. fmt('/mermaid_images/diagram_%03d.png', n),
    script_dir   .. fmt('/mermaid_images/diagram_%03d.svg', n),
  }
end

local function missing_mermaid_block(n)
  local expected = project_root
    .. string.format('/assets/auto/diagrams/diagram_%03d.png', n)
  return pandoc.Div({
    pandoc.Para({
      pandoc.Strong({pandoc.Str('Diyagram görseli eksik:')}),
      pandoc.Space(),
      pandoc.Str('Beklenen: ' .. expected
        .. ' — post-production pipeline çalıştırın.')
    })
  }, pandoc.Attr('', {}, {['custom-style'] = 'Dikkat Kutusu'}))
end

function CodeBlock(el)
  local is_mermaid = false
  if el.classes then
    for _, cls in ipairs(el.classes) do
      if cls == 'mermaid' then is_mermaid = true end
    end
  end
  if not is_mermaid then return nil end

  mermaid_counter = mermaid_counter + 1
  for _, img in ipairs(mermaid_image_candidates(mermaid_counter)) do
    if file_exists(img) then
      local attr = pandoc.Attr('', {}, {width = mermaid_image_width})
      return pandoc.Para({pandoc.Image({pandoc.Str('Diyagram')}, img, '', attr)})
    end
  end
  return missing_mermaid_block(mermaid_counter)
end

-- ── Tablo ─────────────────────────────────────────────────────────────────────
local function table_after_spacing()
  return pandoc.Div({pandoc.Para({pandoc.Str('')})},
    pandoc.Attr('', {}, {['custom-style'] = 'Normal'}))
end

local function style_table_header_cell(cell)
  local new_blocks = {}
  for _, blk in ipairs(cell.contents) do
    if blk.t == 'Para' or blk.t == 'Plain' then
      table.insert(new_blocks, pandoc.Div({blk},
        pandoc.Attr('', {}, {['custom-style'] = 'TableHeader'})))
    else
      table.insert(new_blocks, blk)
    end
  end
  cell.contents = new_blocks
  return cell
end

function Table(el)
  if el.head and el.head.rows then
    for _, row in ipairs(el.head.rows) do
      if row.cells then
        for i, cell in ipairs(row.cells) do
          row.cells[i] = style_table_header_cell(cell)
        end
      end
    end
  end
  return {el, table_after_spacing()}
end

-- ── Bölüm sekmeleri ──────────────────────────────────────────────────────────
local function chapter_tab_text(htxt)
  local n = htxt:match('^Bölüm%s+(%d+)')
  if n then return 'Bölüm ' .. n end
  local ek = htxt:match('^(Ek%s+[A-Z])')
  if ek then return ek end
  return nil
end

function BlockQuote(el)
  local out, current_style, current_blocks = {}, nil, {}

  local function flush_current()
    if current_style and #current_blocks > 0 then
      table.insert(out, pandoc.Div(current_blocks,
        pandoc.Attr('', {}, {['custom-style'] = current_style})))
    elseif #current_blocks > 0 then
      table.insert(out, pandoc.BlockQuote(current_blocks))
    end
    current_style, current_blocks = nil, {}
  end

  for _, blk in ipairs(el.content) do
    local segments = split_para_segments(blk)
    if segments then
      for _, seg in ipairs(segments) do
        flush_current()
        current_style = seg.style
        table.insert(current_blocks, seg.para)
      end
    else
      table.insert(current_blocks, blk)
    end
  end
  flush_current()
  if #out > 0 then return out end
end

function Pandoc(doc)
  local blocks, active_chapter_tab = {}, nil
  local last_was_pagebreak = false

  local function is_chapter_header_block(blk)
    return blk and blk.t == 'Header' and blk.level == 1
           and chapter_tab_text(stringify(blk.content)) ~= nil
  end

  local function next_significant_block(blocks_in, start_index)
    for j = start_index + 1, #blocks_in do
      local b = blocks_in[j]
      if not is_pagebreak_block(b) and b.t ~= 'Null' then return b end
    end
  end

  local function insert_chapter_end_tab()
    if active_chapter_tab then
      table.insert(blocks,
        make_styled_para({pandoc.Str('BÖLÜM SONU')}, 'Bolum Sekmesi'))
      active_chapter_tab, last_was_pagebreak = nil, false
      return true
    end
    return false
  end

  for i, blk in ipairs(doc.blocks) do
    if is_manual_chapter_end_block(blk) then
      last_was_pagebreak = false

    elseif is_pagebreak_block(blk) then
      local nxt = next_significant_block(doc.blocks, i)
      if active_chapter_tab and is_chapter_header_block(nxt) then
        insert_chapter_end_tab()
      end
      table.insert(blocks, word_pagebreak())
      last_was_pagebreak = true

    elseif blk.t == 'Header' then
      if blk.level == 1 then
        local tab = chapter_tab_text(stringify(blk.content))
        if tab then
          if active_chapter_tab then
            insert_chapter_end_tab()
            if not last_was_pagebreak then
              table.insert(blocks, word_pagebreak())
              last_was_pagebreak = true
            end
          end
          table.insert(blocks,
            make_styled_para({pandoc.Str(tab)}, 'Bolum Baslangic Sekmesi'))
          active_chapter_tab = tab
          last_was_pagebreak = false
        end
      end
      table.insert(blocks, blk)
      last_was_pagebreak = false

    else
      table.insert(blocks, blk)
      last_was_pagebreak = false
    end
  end

  insert_chapter_end_tab()
  doc.blocks = blocks
  return doc
end
