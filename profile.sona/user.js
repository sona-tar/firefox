/// ���낢��

// Firefox��GUI�Őݒ�ł���I�v�V����
user_pref("browser.download.manager.closeWhenDone", true);
user_pref("browser.preferences.advanced.selectedTabIndex", 3);
user_pref("browser.startup.homepage", "http://google.co.jp/");
user_pref("browser.tabs.loadInBackground", false);
user_pref("browser.tabs.warnOnClose", false);
user_pref("xpinstall.whitelist.required", false);

// 1�s�e�L�X�g�{�b�N�X�ɉ��s���܂ޕ�����𒣂�t������Ƃ��̓����ݒ� [2]
// 0: ���s���܂߂Ă��̂܂ܓ\��t����
// 1: �ŏ��̍s������\��t����
// 2: ���s���X�y�[�X�ɒu��������
// 3: ���s���폜����
// 4: ���s���R���}�ɒu��������
user_pref("editor.singleLine.pasteNewlines", 2);


/* ===== �^�u���� ==============================*/
// �u���E�U�̋N�����ɊJ���y�[�W [1]
// 0: ��
// 1: �z�[���y�[�W
// 2: �Ō�ɕ\�����Ă����y�[�W
// 3: �Ō�ɊJ���Ă����^�u�S��
user_pref("browser.startup.page", 3);

// �^�u��1�̎��Ƀ^�u�o�[���B�� [true]
user_pref("browser.tabs.autoHide", false);

// �^�u�̕���{�^���̕\�� [1]
// 0: �A�N�e�B�u�ȃ^�u�����\��
// 1: ���ׂẴ^�u�ɕ\��
// 2: ���ׂẴ^�u�ɔ�\��
// 3: ��Ԓ[�����ɕ\��
user_pref("browser.tabs.closeButtons", 2);

// �^�u��������A���̃^�u�Ƀt�H�[�J�X���邩 [true]
user_pref("browser.tabs.selectOwnerOnClose", true);

// �^�u�����̋L���� [10]
user_pref("browser.sessionstore.max_tabs_undo", 25);

// �����N�𒆃N���b�N�����Ƃ��Ƀ^�u�ŊJ���� [true]
user_pref("browser.tabs.opentabfor.middleclick", true);

// �����o�[�̌��ʂ�V�����^�u�ŊJ���� [false]
user_pref("browser.search.openintab", true);

// �V�����^�u���o�b�N�O���E���h�ŊJ���� [true]
user_pref("browser.tabs.loadInBackground", false);

// �V�����^�u�Ńu�b�N�}�[�N���J���Ƃ��A���̃^�u�̓o�b�N�O���E���h�ŊJ���� [false]
user_pref("browser.tabs.loadBookmarksInBackground", false);

// �u�b�N�}�[�N�t�H���_���J���ꍇ�Ƀ^�u��u�������邩 [true]
user_pref("browser.tabs.selectOwnerOnClose", false);


// �O���A�v���P�[�V��������̃����N���� [3]
// 1: ���݂̃^�u(�E�B���h�E)�ɊJ��
// 2: �V�����E�C���h�E�ŊJ��
// 3: �V�����^�u�ŊJ��
user_pref("browser.link.open_external", 3);

// �V�����E�C���h�E���J�������N�̋���(JS�܂�) [3]
// 1: ���݂̃^�u(�E�B���h�E)�ɊJ��
// 2: �V�����E�C���h�E�ŊJ��
// 3: �V�����^�u�ŊJ��
user_pref("browser.link.open_newwindow", 3);

// �V�����E�B���h�E�̐�����ύX [2]
// 0: �V�����E�B���h�E�����ׂČ��݂̃^�u(�E�B���h�E)�܂��͐V�����^�u�ɊJ��
// 1: JavaScript �ɂ���ĊJ�����E�B���h�E�͑ΏۊO�Ƃ���
// 2: �T�C�Y�E�ʒu�E�c�[���o�[�̎w�肪�܂܂�� JavaScript �E�B���h�E�͑ΏۊO�Ƃ���
user_pref("browser.link.open_newwindow.restriction", 0);


// �������L���b�V���̍ő�e��

user_pref("browser.cache.memory.capacity", 65536);

// disk�L���b�V�����I�t�ɂ���
user_pref("browser.cache.disk.enable" , false);

// �L���b�V���̕ۑ����ύX(RAMDISK��ɒu���Ă� Qsoft Enterprise Lite���g����RAMDISK���쐬

// user_pref("browser.cache.disk.parent_directory","B:\\Temp");

// SSL�ʐM�Ŏ󂯎�����f�[�^���L���b�V�����邩�ۂ�

user_pref("browser.cache.disk_cache_ssl", true);

// �ڑ����G���[�̎��A���邳���_�C�A���O�łȂ��G���[�y�[�W��\��������

user_pref("browser.xul.error_pages.enabled", true);

// (����)�\�t�g���ŃC�x���g�����[�v���Ă��܂����Ƃ��ɉ�͂𒆒f�����邩?

user_pref("content.interrupt.parsing", true);

// �y�[�W�̃����_�����O���̊���Ԃ̗L����(?)

user_pref("content.notify.ontimer", true);

// �s��

//user_pref("content.maxtextrun", 8191);

user_pref("content.maxtextrun", 4095);

// �s��

user_pref("signed.applets.codebase_principal_support", true);

// about:plugins�Ńv���O�C���̊��S�Ȉʒu�������܂�

user_pref("plugin.expose_full_path", true);

// �T�u���j���[�̕\���ҋ@���Ԃ̐ݒ�B

user_pref("ui.submenuDelay", 0);

// �y�[�W�̑�܂��ȃ��C�A�E�g�̌v�Z�����񂾎��ɁA����Ԃł̃����_�����O���n�܂�܂ł̃y�[�W�̍ď�������(?)

user_pref("content.notify.backoffcount", 5);

// ipv6�����𖳌��ɂ���

user_pref("network.dns.disableIPv6",true);

///���x�ς��炵������O�O���ĐF�X�Ȓl���Q�l�ɂ��Ď����Ă݂�

// �\�t�g���ŃC�x���g�����[�v���āA��͂𒆒f�������Ƃ��A���̏����܂ł̎���

user_pref("content.max.tokenizing.time", 250000);

// content.notify.backoffcount�Ō��߂������ʂ̎��Ԃ̊Ԋu(?)

user_pref("content.notify.interval", 500000);

// �y�[�W�������_�����O����O�̑҂�����

user_pref("nglayout.initialpaint.delay", 500);

// �����Ŏw�肵�����ԁA�}�E�X���̓L�[��������Ȃ��� high frequency mode ���� low frequency mode �ɐ؂�ւ��

user_pref("content.switch.threshold", 500000);


///�p�C�v�ݒ�(user_pref("network.http.pipelining", false);��true�ɂ��Ȃ��ƈȉ��̐ݒ�͈Ӗ�����܂���

//�p�C�v�L��

user_pref("network.http.pipelining", false);

// �ʐM�̂����̍ŏ��̗v���Ńp�C�v���C���������g����

user_pref("network.http.pipelining.firstrequest", true);

//�p�C�v�̍ō��{��

user_pref("network.http.pipelining.maxrequests", 8);

// �ڑ����̏��

user_pref("network.http.max-connections", 48);

// 1�T�[�o���̐ڑ����̏��

user_pref("network.http.max-connections-per-server", 16);

// 1�v���L�V���̎����I�ڑ����̏��

user_pref("network.http.max-persistent-connections-per-proxy", 8);

// 1�T�[�o���̎����I�ڑ����̏��

user_pref("network.http.max-persistent-connections-per-server", 8);


/// ���̑��������Ƃ͊֌W�Ȃ��ݒ�
// �A���`�E�B���X�X�L�����̖�����
user_pref("browser.download.manager.scanWhenDone",false);

// Fx �I�����Ƀ_�E�����[�h�������N���A���� (�f�t�H�F2)
user_pref("browser.download.manager.retention",1);

// ��������_�u���N���b�N�����Ƃ��ɔ��p�X�y�[�X����菜��
user_pref("layout.word_select.eat_space_to_next_word", false);

// ICC�v���t�@�C���ݒ�
//user_pref("gfx.color_management.enabled", true);
//user_pref("gfx.color_management.display_profile", "D:\Software\L567INF_W\L567D65.icm");



// �t���[������Ƀ��T�C�Y�\��
user_pref("layout.frames.force_resizability", true);

// �\�[�X�̕\���Œ����s�������I�ɐ܂�Ԃ�
user_pref("view_source.wrap_long_lines", true);

// �E�N���b�N���֎~�ɂ����Ȃ�
user_pref("nglayout.events.dispatchLeftClickOnly", true);

// URL�o�[�E�X�N���[���o�[�͉B���̋֎~
user_pref("dom.disable_window_open_feature.location", true);
user_pref("dom.disable_window_open_feature.scrollbars",true);

// �g���̃C���X�g�[���ɂ�������������̂������h�N�T�C
user_pref("xpinstall.whitelist.required", false);

// �X�N���[���o�[��ł̒��N���b�N�ł��̈ʒu�܂ň�C�ɃX�N���[��
user_pref("middlemouse.scrollbarPosition", true);

// �}�E�X�̒��N���b�N�ŁA�N���b�v�{�[�h�̓��e�𒣂�t��
user_pref("middlemouse.paste", true);