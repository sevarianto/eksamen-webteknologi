/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'
import Script from 'next/script'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <>
    <Script
      id="show-selected-value"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function updateSelectIndicators() {
              const selectFields = document.querySelectorAll('select');
              selectFields.forEach(function(select) {
                const fieldContainer = select.closest('[class*="field"]');
                if (!fieldContainer) return;
                const selectedOption = select.options[select.selectedIndex];
                const selectedText = selectedOption ? selectedOption.text : '';
                if (selectedText && select.value) {
                  fieldContainer.setAttribute('data-selected-value', selectedText);
                  fieldContainer.classList.add('has-selected-value');
                } else {
                  fieldContainer.removeAttribute('data-selected-value');
                  fieldContainer.classList.remove('has-selected-value');
                }
              });
            }
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', updateSelectIndicators);
            } else {
              updateSelectIndicators();
            }
            document.addEventListener('change', function(e) {
              if (e.target.tagName === 'SELECT') {
                updateSelectIndicators();
              }
            });
            const observer = new MutationObserver(updateSelectIndicators);
            observer.observe(document.body, { childList: true, subtree: true });
          })();
        `,
      }}
    />
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  </>
)

export default Layout
