function PageTabs(buttons, container) {
    var _s = this;
    _s.tabsContainer = document.querySelector(container);
    _s.tabs = [].slice.call(_s.tabsContainer.querySelectorAll('[data-tabs-item-id]'), 0);
    _s.tabsBtn = document.querySelector(buttons);
    _s.btns = [].slice.call(_s.tabsBtn.querySelectorAll('[data-tabs-btn-id]'), 0);
    _s.delay = 300;

    _s.binding = function () {
        for(var i = 0; i < _s.btns.length; i++) {
            _s.btns[i].tab = _s.tabs[i];
            _s.btns[i].tab.box = _s.btns[i].tab.querySelector('[data-tabs-box]');
            _s.btns[i].tab.box.style.transition = _s.delay + 'ms';
            _s.btns[i].tab.box.style.opacity = '0';
        }
        _s.btns[0].tab.box.style.opacity = '1';
    }

    _s.changeTab = function (btn) {
        if (!btn.classList.contains('active')) {
            _s.tabsContainer.style.animation = 'none';

            setTimeout(function () {
                _s.tabsContainer.style.animation = 'move ' + _s.delay * 2 + 'ms';
            },10);

            for(var i = 0; i < _s.btns.length; i++) {
                _s.btnRemoveActive(_s.btns[i]);

                var tab = _s.btns[i].tab;

                if (tab.classList.contains('active')) {
                    _s.hideTab(tab);
                }
            }
            _s.btnAddActive(btn);

            setTimeout(function () {
                _s.showTab(btn);
            },_s.delay);
        }
    }

    _s.btnAddActive = function(btn) {
        btn.classList.add('active');
    }

    _s.btnRemoveActive = function(btn) {
        btn.classList.remove('active');
    }

    _s.hideTab = function (tab) {
        tab.box.style.opacity = '0';

        setTimeout(function () {
            tab.classList.remove('active');
        },_s.delay);
    }

    _s.showTab = function (btn) {
        if (btn.classList.contains('active')) {
            btn.tab.classList.add('active');
            setTimeout(function () {
                btn.tab.box.style.opacity = '1';
            },10);
        }
    }

    _s.init = function () {
        _s.binding();

        var indClick = true;

        for(var i = 0; i < _s.btns.length; i++) {
            _s.btns[i].addEventListener('click', function () {
                if (indClick) {
                    indClick = false;
                    _s.changeTab(this);
                    setTimeout(function () {
                        indClick = true;
                    },_s.delay * 2);
                }
            });
        }
    }

    return {
        init: _s.init
    }
}

function PagePopup(popup) {
    var _s = this;
    _s.popup = document.querySelector('[data-popup="' + popup + '"]');
    _s.btnClose = _s.popup.querySelectorAll('[data-close-popup]');
    _s.listPopup = document.querySelectorAll('[data-popup]');
    _s.transition = 300;

    _s.change = function() {
        for (var i = 0; i < _s.listPopup.length; i++) {
            if (_s.listPopup[i].classList.contains('open')) {
                _s.close(_s.listPopup[i]);

                setTimeout(_s.open, _s.transition);
            } else {
                _s.open();
            }
        }
    }

    _s.open = function () {
        _s.popup.style.display = 'block';

        setTimeout(function () {
            _s.popup.classList.add('open');
        },0)
    }

    _s.close = function (popup) {
        popup.classList.remove('open');

        setTimeout(function () {
            popup.style.display = 'none';
        },_s.transition);
    }

    _s.closeCurrentPopup = function () {
        _s.popup.classList.remove('open');

        setTimeout(function () {
            _s.popup.style.display = 'none';
        },_s.transition);
    }

    _s.init = function () {
        for (var i = 0; i < _s.btnClose.length; i++ ) {
            _s.btnClose[i].addEventListener('click', function () {
                _s.close(_s.popup);
            })
        }
    }

    return {
        change: _s.change,
        open: _s.open,
        init: _s.init,
        close: _s.closeCurrentPopup
    }
}

function openPopup(popup) {
    var p = new PagePopup(popup);
    p.change();
}

function closePopup(popup) {
    var p = new PagePopup(popup);
    p.close();
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll('[data-popup]').length) {
        var listBtnOpenPopup = document.querySelectorAll('[data-open-popup]');

        for (var i = 0; i < listBtnOpenPopup.length; i++) {
            var popup = listBtnOpenPopup[i].dataset.openPopup;

            listBtnOpenPopup[i].popup = new PagePopup(popup);

            listBtnOpenPopup[i].popup.init();
        }

        for (var i = 0; i < listBtnOpenPopup.length; i++) {
            listBtnOpenPopup[i].addEventListener('click', function () {
                this.popup.change();
            })
        }
    }

    if (document.querySelector('.banner-slider-container')) {
        var bannerSlider = new Swiper('.banner-slider-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 600,
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.banner-slider-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }

    if (document.getElementById('media-box-scroll')) {
        new SimpleBar(document.getElementById('media-box-scroll'), { autoHide: false });
    }

    if (document.querySelector('[data-tabs-buttons="services"]') &&  document.querySelector('[data-content="services"]')) {
        new PageTabs('[data-tabs-buttons="services"]', '[data-content="services"]').init();
    }
})