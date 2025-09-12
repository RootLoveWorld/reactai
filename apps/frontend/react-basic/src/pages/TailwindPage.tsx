import React from 'react';
import { TailwindExample } from '../components';

const TailwindPage: React.FC = () => {
  return (
    <div>
      <div className="difference">
        <h3>🎨 Tailwind CSS 示例</h3>
        <p><strong>核心概念：</strong></p>
        <ul>
          <li><strong>实用优先：</strong> 使用预定义的 CSS 类构建自定义设计</li>
          <li><strong>响应式设计：</strong> 内置断点系统，轻松实现响应式布局</li>
          <li><strong>可定制性：</strong> 通过配置文件完全自定义设计系统</li>
          <li><strong>无冗余：</strong> PurgeCSS 集成，自动移除未使用的样式</li>
        </ul>
        
        <h4>📋 使用场景：</h4>
        <ul>
          <li>快速原型设计</li>
          <li>一致的设计系统</li>
          <li>响应式用户界面</li>
          <li>减少 CSS 代码量</li>
          <li>团队协作开发</li>
        </ul>

        <h4>⚡ 优势：</h4>
        <ul>
          <li>✅ 开发速度快，无需切换文件</li>
          <li>✅ 低维护成本</li>
          <li>✅ 移动端优先设计</li>
          <li>✅ 易于维护和重构</li>
        </ul>

        <h4>⚠️ 注意事项：</h4>
        <ul>
          <li>❗ HTML 类名可能变得冗长</li>
          <li>❗ 需要学习类名系统</li>
          <li>❗ 可能需要额外配置来满足特殊需求</li>
        </ul>
      </div>

      <TailwindExample 
        title="Tailwind CSS 功能展示"
        items={[
          "响应式设计",
          "实用类优先",
          "易于定制",
          "无冗余样式",
          "组件友好"
        ]}
      />

      <div style={{
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '8px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <h4 style={{ color: '#0369a1', margin: '0 0 15px 0' }}>💡 实现要点</h4>
        <ul style={{ color: '#0c4a6e', margin: 0, paddingLeft: '20px' }}>
          <li>使用预定义的 CSS 类而不是自定义样式</li>
          <li>利用响应式前缀实现移动端适配</li>
          <li>通过配置文件自定义主题</li>
          <li>使用 <code>@apply</code> 指令创建组件类</li>
        </ul>
      </div>
    </div>
  );
};

export default TailwindPage;